mod config;
mod delete;
mod prep_ban;

use config::SET_DELAY_COMMAND;
use delete::DELETE_COMMAND;
use prep_ban::PREP_BAN_COMMAND;

use serenity::framework::standard::macros::group;
#[group]
#[commands(set_delay, delete, prep_ban)]
pub(crate) struct Moderators;
