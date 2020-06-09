import { path, fs, parseToml } from "../deps.ts";

interface foxScripts {
	commands: string[][]
}

/**
 * Get scripts to run by reading from a config file
 */
export async function getCommands(): Promise<string[][]> {
	const fileContent = await Deno.readTextFile('./scripts.fox.toml')
	const obj = parseToml(fileContent) as foxScripts
	return obj.commands
}

export function commandInPath(command: string): boolean {
	return true
}

export async function run(command: string[]) {
	if (!commandInPath) throw new Error('command not in path. install all requried dependencies before continuing')

	const proc = Deno.run({
		stdout: "piped",
    stderr: "inherit",
    stdin: "inherit",
		cmd: command
	})

	await proc.status();
	// proc.output() already calls close() on stdout
	await proc.output();
	await proc.close();
}
