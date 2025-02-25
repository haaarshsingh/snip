## Snip Bot

Create snips from Discord.

> NOTE: THIS PROJECT IS A WIP—MEANING CURRENTLY, IT'S BROKEN AND INCOMPLETE.

### Usage

In Discord, type:

```
++snip [codeblock1] [codeblock2] [codeblock3]
```

This will return an embed with the link of the created codeblocks. The languages are the same as the codeblock, or auto-detected if left blank. Currently, you cannot set individual file titles with this bot.

### Installation

First, clone the repository:

```
git clone https://github.com/haaarshsingh/snip
cd snip
```

Configure your environment variables:

```
mv .env.EXAMPLE .env
```

Run the bot:

```
cargo run --release
```

You can configure all other settings (e.g. prefix) in the `config.json` file.
