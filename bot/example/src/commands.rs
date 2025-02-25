mod help;

mod all_channels;
mod moderators;
mod specific_channel;

pub(crate) use all_channels::ALLCHANNELS_GROUP;
pub(crate) use help::MY_HELP;
pub(crate) use moderators::MODERATORS_GROUP;
pub(crate) use specific_channel::SPECIFICCHANNEL_GROUP;

use dotenv::var;
use serenity::{client::Context, model::channel::Message};

pub(crate) const NON_THANKS_COMMANDS_VAR_KEY: &str = "OTHER_NON_THANKS_COMMANDS";

async fn is_in_incorrect_channel(ctx: &Context, msg: &Message) -> bool {
    msg.channel_id
        .name(&ctx)
        .await
        .map(|v| {
            v != var(NON_THANKS_COMMANDS_VAR_KEY)
                .expect("top channel not set")
                .to_lowercase()
        })
        .unwrap_or(true)
}
