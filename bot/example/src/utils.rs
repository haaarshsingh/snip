use std::time::SystemTime;

use serenity::{
    client::Context, framework::standard::CommandError, model::guild::Guild, model::id::UserId,
    model::prelude::User, prelude::TypeMapKey,
};
use sqlx::PgPool;

pub(crate) fn get_time_as_unix_epoch(time: SystemTime) -> i64 {
    match time.duration_since(SystemTime::UNIX_EPOCH) {
        Ok(x) => x,
        //this happens if earlier > time. Which would mean that the system time is screwed up.
        //the duration I get in the error then refers to how much time it was earlier
        //maybe I should just panic instead?
        Err(x) => x.duration(),
    }
    .as_secs() as i64
}
pub(crate) async fn is_moderator(
    ctx: &Context,
    guild: &Guild,
    author: &User,
) -> Result<bool, CommandError> {
    let guild_id = guild.id;
    let mod_role = guild.role_by_name("Moderator");
    let thank_bot_mod_role = guild.role_by_name("ThankBotManager");
    Ok(match (mod_role, thank_bot_mod_role) {
        (Some(x), Some(y)) => {
            author.has_role(&ctx, guild_id, x).await? || author.has_role(&ctx, guild_id, y).await?
        }
        (Some(x), None) => author.has_role(&ctx, guild_id, x).await?,
        (None, Some(y)) => author.has_role(&ctx, guild_id, y).await?,
        (None, None) => false,
    })
}

pub(crate) struct BotId;

impl TypeMapKey for BotId {
    type Value = UserId;
}
pub(crate) struct DbPool;

impl TypeMapKey for DbPool {
    type Value = PgPool;
}
