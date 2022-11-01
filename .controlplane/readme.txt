Some notes for furhter editing...

Initial steps:
- fill `env_defaults`
- run `./setup gvc postgres redis rails` to setup infrastructure
- run `./build` to build and push latest image

env_defaults:
- need to fill values before any execution of other commands

setup:
- use to apply yaml templates for the app (and substitute envs in them)
- templates are in `.controlplane/templates/...`
- can apply single or multiple templates by name - e.g. `./setup gvc postgres redis`

build:
- builds CPLN's Dockerfile and pushes it to CPLN repo
- image name is suffixed by ':latest' for simplicity, no versioning
- force restart workload after build

entrypoint.sh:
- waits for postgres and redis to be available
- runs `rails db:prepare` to create&seed or migrate database

run:
- analogue of `heroku run` one-off dynos
- creates a clone of app workload, connects to it, executes whatever and deletes workload
- opens interactive shell when called w/o args, e.g.: `./run`
- executes provided command and exists when called with args, e.g.: `./run rails db:migrate:status`
- limitation: atm, there is no way to exectute command with args from `cpln` cli, so it uses some scripting workarounds
- limitation: when called as `./run rails c` it will not open interactive shell, but will execute command and timeout. To open as interactive, do 1) `./run` to start bash interactive shell 2) type `rails c` manually
