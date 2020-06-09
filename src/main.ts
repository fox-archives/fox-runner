import { path, fs, parseToml } from "../deps.ts";
import { ensure } from "https://deno.land/x/ensure/mod.ts";
import { Config } from "https://raw.githubusercontent.com/eankeen/config/master/mod.ts";
import { green, red, blue } from "https://deno.land/std/fmt/colors.ts";

ensure({
  denoVersion: "1.0.5"
});

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

export async function run(command: string[]) {
	try {
		console.info(blue(`executing: ${command}`))
		const proc = Deno.run({
			stdout: "piped",
			stderr: "piped",
			stdin: "piped",
			cmd: command,
		});

		const output = await proc.output();
		// console.info((new TextDecoder()).decode(output));
		const status = await proc.status();
		if (!status.success) throw new Error("status not 0. exiting prematuraly");
		console.info(green('success'))
	} catch (err) {
		console.info(red(`error while executing '${command}'`))
		throw new Error(err)
	}
}
