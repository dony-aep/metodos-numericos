@AGENTS.md

# Claude Code

`AGENTS.md` above holds all the project instructions. Edit that file, not this one. This file
only exists so the import still works in sessions that can't read `AGENTS.md` directly
(Bedrock, telemetry disabled, the first session after an upgrade). Use the import, never a
symlink: the repo is worked on from Windows, where Git checks symlinks out as plain text.

Add something here only if it applies to Claude Code alone.

- `.claude/settings.json` enables the `shadcn` MCP server. Use it to search the registry and
  get the exact `add` command before adding a component.
