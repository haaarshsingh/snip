mod github;
mod me;
mod top;

use github::{BUG_COMMAND, GITHUB_COMMAND};
use me::RANK_COMMAND;
use serenity::framework::standard::macros::group;
use top::TOP_COMMAND;
#[group]
#[commands(github, top, bug, rank)]
pub(crate) struct SpecificChannel;
