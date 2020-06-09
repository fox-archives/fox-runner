# Fox Runner

Runs `$PATH` scripts in your order

## Installation

```sh
deno install --unstable \
	--allow-read --allow-write --allow-env --allow-run \
	-n fox-runner \
	https://raw.githubusercontent.com/fox-land/sort-json/master/cli.ts
```

## Usage

In `$PWD`

```toml
# scripts.fox.toml
commands = [
	[ 'sort-json' ]
]
```

```sh
fox-runner
```
