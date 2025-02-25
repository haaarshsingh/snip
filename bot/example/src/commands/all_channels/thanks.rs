use crate::utils::{get_time_as_unix_epoch, DbPool};
use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::channel::Message,
};
use sqlx::query;
use std::convert::TryFrom;
use std::time::{Duration, SystemTime};

#[command]
#[aliases("thanks", "thank")]
#[description("Lets me know that someone helped you out or was awesome in another way.")]
#[usage("{some text containing one or more users who you want to thank for something}")]
#[example = "@thanks_bot for being AWESOME!"]
#[only_in("guild")]
#[help_available]
pub(crate) async fn thx(ctx: &Context, msg: &Message) -> CommandResult {
    let server_id = match msg.guild_id {
        Some(x) => i64::from(x),
        None => return Ok(()),
    };
    let thanking: &Vec<_> = &msg.mentions;
    let mention_count = thanking.len();
    if mention_count == 0 {
        msg.channel_id
            .say(
                &ctx.http,
                "Please ping the user in your thank message so I know who you are thanking.",
            )
            .await?;
        return Ok(());
    }

    let mut transaction = {
        let data = ctx.data.read().await;
        let pool = data.get::<DbPool>().expect("No db pool?");
        pool.begin().await?
    };

    let time_between_thanking = query!(
        "SELECT time_between_thanking
        FROM server_config
        WHERE server_id=$1",
        server_id
    )
    .fetch_optional(&mut transaction)
    .await?
    .map(|v| u64::try_from(v.time_between_thanking))
    .unwrap_or(Ok(1))?
        * 60;
    let current_time_minus_one_minute =
        get_time_as_unix_epoch(SystemTime::now() - Duration::new(time_between_thanking, 0));

    let thanker_id = i64::from(msg.author.id);
    let mut contains_at_least_one_to_recent = false;
    let mut thanked_self = false;
    for thanked_user in thanking {
        if thanked_user.id == msg.author.id {
            thanked_self = true;
            continue;
        }
        let thanked_user_id = i64::from(thanked_user.id);
        let count = query!(
            "
            SELECT count(*) AS count 
            FROM recent_thanked
            WHERE user_id = $1 
            AND did_thank = $2
            AND at_time > $3
            AND server_id = $4
            ",
            thanker_id,
            thanked_user_id,
            current_time_minus_one_minute,
            server_id
        )
        .fetch_one(&mut transaction)
        .await?
        .count
        .expect("SQL COUNT returned NULL. The world is broken!");
        if count == 0 {
            query!(
                "
                INSERT INTO thanked_users (user_id,server_id, times)
                VALUES($1,$2,1) 
                ON CONFLICT ON CONSTRAINT thanked_users_pk 
                DO 
                UPDATE SET times = thanked_users.times + 1;
                ",
                thanked_user_id,
                server_id
            )
            .execute(&mut transaction)
            .await?;

            query!(
                "
                    INSERT INTO recent_thanked (user_id, did_thank, server_id, at_time)
                    VALUES ($1,$2,$3,$4)
                    ON CONFLICT ON CONSTRAINT recent_thanked_pk 
                    DO
                    UPDATE SET at_time = $4;
                ",
                thanker_id,
                thanked_user_id,
                server_id,
                get_time_as_unix_epoch(SystemTime::now())
            )
            .execute(&mut transaction)
            .await?;
        } else {
            contains_at_least_one_to_recent = true;
        }
        println!("thanked user = {:?}", thanked_user.id);
    }
    transaction.commit().await?;
    let contents = match (mention_count,contains_at_least_one_to_recent,thanked_self, msg.mentions_me(&ctx).await?) {
        (1,_, true,_) =>String::from( "To keep it fair, you can not thank yourself."),
        (1,true,_,_) => String::from("Sorry, you already thanked this user not so long ago. Wait a minute before thanking him/her again"),
        (1,_,_,true) => String::from("Thank you! I just do my best! :)"),
        (1, false,false,false) => String::from("Thank you for letting me know that this person helped you out."),
        (2,true,true,_) => String::from("Sorry, but you can't thank yourself and you already recently thanked the other person"),
        (_,contains_too_recent,thanked_self, _ ) => {
            let mut base_message = String::from("Thanks for informing me that these users helped you out!");
            if contains_too_recent {
                base_message.push_str(" Your message contains users you already thanked. Wait a minute before thanking them again :).")
            }
            if thanked_self {
                base_message.push_str(" You can't thank yourself.")
            }
            base_message
        }
    };

    msg.channel_id.say(&ctx.http, &contents).await?;

    Ok(())
}
