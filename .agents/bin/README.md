# Agent Workflow Scripts

Standard entry points that portable agent-workflow skills call, so a skill can
run `.agents/bin/<name>` in any repo without knowing this repo's specific
commands. Each script is a thin, repo-owned wrapper. A script that is **absent**
means that capability is n/a here.

| Script | Purpose | This repo runs |
| --- | --- | --- |
| `setup` | Install dependencies | `exec bin/conductor-exec bin/setup --skip-server "$@"` |
| `validate` | Pre-push gate | `exec bin/conductor-exec bin/rubocop "$@"` |
| `test` | Run tests | `renderer_port="${RENDERER_PORT:-3800}" + if [[ -n "${RENDERER_PORT:-}" && -z "${RENDERER_URL:-}" ]]; then + export RENDERER_URL="http://localhost:$renderer_port" + fi + renderer_started=false + renderer_pid='' + cleanup_renderer() { + local status=$? + if [[ "$renderer_started" == true ]] && kill -0 "$renderer_pid" 2>/dev/null; then + kill "$renderer_pid" 2>/dev/null || true + wait "$renderer_pid" 2>/dev/null || true + fi + exit "$status" + } + trap cleanup_renderer EXIT + bin/conductor-exec bin/setup --skip-server + if nc -z localhost "$renderer_port" 2>/dev/null; then + echo "Reusing existing Node renderer on port $renderer_port." + else + bin/conductor-exec node renderer/node-renderer.js & + renderer_pid=$! + renderer_started=true + echo "Waiting for Node renderer (PID $renderer_pid) on port $renderer_port..." + for _ in $(seq 1 30); do + if ! kill -0 "$renderer_pid" 2>/dev/null; then + echo "Node renderer exited unexpectedly (see output above)." >&2 + exit 1 + fi + if nc -z localhost "$renderer_port" 2>/dev/null; then + break + fi + sleep 1 + done + if ! nc -z localhost "$renderer_port" 2>/dev/null; then + echo "Node renderer failed to start on port $renderer_port within 30 seconds (see output above)." >&2 + exit 1 + fi + fi + bin/conductor-exec bin/ci` |
| `lint` | Lint / format | `exec bin/conductor-exec yarn lint:eslint "$@"` |
| `build` | Build / type-check | `exec bin/conductor-exec yarn build:test "$@"` |
| `docs` | Docs checks | n/a |
| `ci-detect` | CI change detector | n/a |

Non-command policy lives in [`../agent-workflow.yml`](../agent-workflow.yml).
