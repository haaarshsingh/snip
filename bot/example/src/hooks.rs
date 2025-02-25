use serenity::{
    client::Context, framework::standard::macros::hook, framework::standard::CommandResult,
    model::channel::Message,
};

#[hook]
pub(crate) async fn after(
    _ctx: &Context,
    _msg: &Message,
    command_name: &str,
    command_result: CommandResult,
) {
    match command_result {
        Ok(()) => println!("Processed command '{}'", command_name),
        Err(why) => println!("Command '{}' returned error {:?}", command_name, why),
    }
}
