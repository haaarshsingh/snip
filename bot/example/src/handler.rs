use async_trait::async_trait;
use serenity::{
    client::{Context, EventHandler},
    model::channel::Message,
    model::prelude::Activity,
    model::prelude::Ready,
};

use crate::{
    logger::check_deleted_message,
    logger::check_edited_message,
    logger::insert_message,
    utils::{is_moderator, BotId, DbPool},
};
pub(crate) struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, ready: Ready) {
        let mut data = ctx.data.write().await;
        data.insert::<BotId>(ready.user.id);
        let mut helper_text = dotenv::var("COMMAND_SYMBOL").unwrap();
        helper_text.push_str("help in #");
        helper_text.push_str(&dotenv::var("ALLOWED_HELP_CHANNEL").unwrap());
        ctx.set_activity(Activity::listening(&helper_text)).await;
    }
    async fn message(&self, ctx: Context, new_message: Message) {
        let id = {
            let data = ctx.data.read().await;
            *data.get::<BotId>().expect("No bot id?")
        };
        if new_message.author.id == id {
            return;
        }
        let guild = match new_message.guild(&ctx).await {
            Some(x) => x,
            None => return,
        };
        if is_moderator(&ctx, &guild, &new_message.author)
            .await
            .unwrap_or(false)
        {
            return;
        }
        let transaction: Result<_, sqlx::Error> = (|| async {
            let data = ctx.data.read().await;
            let pool = data.get::<DbPool>().expect("No db pool?");
            Ok(pool.begin().await?)
        })()
        .await;
        let transaction = match transaction {
            Ok(x) => x,
            Err(x) => {
                let _ = dbg!(x);
                return;
            }
        };
        if let Err(x) = insert_message(&new_message, guild.id, transaction).await {
            let _ = dbg!(x);
        }
    }
    async fn message_delete(
        &self,
        ctx: Context,
        channel_id: serenity::model::id::ChannelId,
        message_id: serenity::model::id::MessageId,
    ) {
        let x = check_deleted_message(&ctx, channel_id, message_id).await;
        if let Err(x) = x {
            let _ = dbg!(x);
            let _ = dbg!(
                channel_id
                    .say(
                        ctx,
                        "Found a deleted message but something has gone wrong when processing"
                    )
                    .await
            );
        }
    }

    async fn message_update(
        &self,
        ctx: Context,
        _old_if_available: Option<Message>,
        _new: Option<Message>,
        event: serenity::model::event::MessageUpdateEvent,
    ) {
        let (mention_roles, mention_users) = match (event.mention_roles, event.mentions) {
            (Some(x), Some(y)) => (x, y),
            _ => {
                let x = ctx
                    .http
                    .get_message(event.channel_id.into(), event.id.into())
                    .await;
                match x {
                    Ok(x) => (x.mention_roles, x.mentions),
                    Err(y) => {
                        let _ = dbg!(
                            event
                                .channel_id
                                .say(ctx, "Could not get message after it got updated :(")
                                .await
                        );
                        let _ = dbg!(y);
                        return;
                    }
                }
            }
        };
        let x = check_edited_message(
            &ctx,
            event.channel_id,
            event.id,
            mention_roles,
            mention_users,
        )
        .await;
        if let Err(x) = x {
            let _ = dbg!(x);
            let _ = dbg!(
                event
                    .channel_id
                    .say(
                        ctx,
                        "Found a deleted message but something has gone wrong when processing"
                    )
                    .await
            );
        }
    }
}
