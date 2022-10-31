#!/bin/sh

GVC=ror-tutorial
IMAGE=ror-tutorial:latest

SCRIPT_PATH=$(dirname $0)

cat "$SCRIPT_PATH/setup.yaml" |
  sed "s/APP_GVC/$GVC/" |
  sed "s/APP_ORG/shakacode-staging/" |
  sed "s/APP_IMAGE/$IMAGE/" |
  cpln apply --gvc $GVC --file -
