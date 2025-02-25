use crate::utils::{is_moderator, DbPool};
use serenity::{
    client::Context,
    framework::standard::{macros::command, Args, CommandResult},
    model::channel::Message,
};
use sqlx::query;

#[command]
#[allowed_roles("Moderator", "ThankBotManager")]
#[aliases("delay", "change_spam_time")]
#[description(
    "Allows you to set the time between users being able to thank the same user (in minutes)"
)]
#[usage("{minutes}")]
#[example = "100000"]
#[help_available]
#[only_in("guild")]
pub(crate) async fn set_delay(ctx: &Context, msg: &Message, mut args: Args) -> CommandResult {
    let guild = match msg.guild(&ctx).await {
        Some(x) => x,
        None => return Ok(()),
    };
    if !is_moderator(ctx, &guild, &msg.author).await? {
        return Ok(());
    }

    let mut transaction = {
        let data = ctx.data.read().await;
        let pool = data.get::<DbPool>().expect("No db pool?");
        pool.begin().await?
    };
    let guild_id = match msg.guild_id {
        Some(x) => i64::from(x),
        None => return Ok(()),
    };
    let time = args.single::<i64>()?;
    if time <= 0 {
        msg.channel_id
            .say(&ctx.http, "Please use a value that is higher or equal to 0")
            .await?;
        return Ok(());
    }
    query!(
        "INSERT INTO server_config (server_id, time_between_thanking)
        VALUES ($1,$2)
        ON CONFLICT ON CONSTRAINT server_config_pk
        DO
        UPDATE SET time_between_thanking=$2",
        guild_id,
        time
    )
    .execute(&mut transaction)
    .await?;
    transaction.commit().await?;
    msg.channel_id
        .say(&ctx.http, "Configuration has been altered.")
        .await?;

    Ok(())
}
