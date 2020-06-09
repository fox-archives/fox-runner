import { getCommands, run } from "./src/main.ts";

if (!import.meta.main) Deno.exit(0);

for (const script of await getCommands()) {
	await run(script)
}
