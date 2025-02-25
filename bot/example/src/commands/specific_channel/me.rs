use serenity::{
    client::Context, framework::standard::macros::command, framework::standard::CommandResult,
    model::channel::Message,
};
use sqlx::query;

use crate::{commands::is_in_incorrect_channel, utils::DbPool};

#[command]
#[aliases("me")]
#[description("Shows how many times you got thanked and your current rank.\n It can also be used to get the rank of someone else.")]
#[usage("[user]")]
#[only_in("guild")]
pub(crate) async fn rank(ctx: &Context, msg: &Message) -> CommandResult {
    let server_id = match msg.guild_id {
        Some(x) => i64::from(x),
        None => return Ok(()),
    };

    if is_in_incorrect_channel(ctx, msg).await {
        return Ok(());
    }
    let mut con = {
        let data = ctx.data.read().await;
        let pool = data.get::<DbPool>().expect("No db pool?");
        pool.acquire().await?
    };

    let user_id: i64 = msg.mentions.first().unwrap_or(&msg.author).id.into();

    let res = query!(
        "
            SELECT 
                thanked_users.times,
                (
                    SELECT COUNT(*) FROM (
                        SELECT times,server_id
                        FROM thanked_users
                            WHERE times >= (
                                SELECT times
                                FROM thanked_users
                                WHERE server_id = $1
                                AND user_id = $2
                            ) AND server_id = $1
                            GROUP BY times,server_id
                    ) as rankings
                ) AS rank
            FROM thanked_users
            WHERE thanked_users.user_id = $2
            AND thanked_users.server_id = $1
            GROUP BY thanked_users.times
        ",
        server_id,
        user_id
    )
    .fetch_optional(&mut con)
    .await?;
    let message = match res {
        Some(x) => format!(
            "This user has been thanked **{} times**. And is at rank {} .",
            x.times,
            x.rank.unwrap()
        ),
        None => String::from("Sorry, no thanks are found for this user :(."),
    };
    msg.channel_id.say(ctx, &message).await?;
    Ok(())
}
