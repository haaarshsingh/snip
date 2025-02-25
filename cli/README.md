## Snip CLI

Create snips from your terminal.

> NOTE: THIS PROJECT IS A WIP—MEANING CURRENTLY, IT'S BROKEN AND INCOMPLETE.

### Usage

In your terminal, type:

```sh
snip file1.rs file2.rs file3.rs
```

This will return the link of a snip with code from each of the files. The file name in snip is based off of the actual name of the file, and the language is detected from the extension. If there's no extension, the language will _not_ be auto-detected—it'll just be set to plain text.

### Installation

First, clone the repository:

```sh
git clone https://github.com/haaarshsingh/snip
cd snip/cli
```

Compile the project:

```sh
cargo build --release
```

Run the CLI:

```sh
cargo run -- [OPTIONS]

# Run the binary directly
./target/release/cli [OPTIONS]
```
