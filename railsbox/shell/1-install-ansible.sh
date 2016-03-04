#!/bin/bash

set -e

if ! command -v ansible >/dev/null; then
  sudo apt-get update

  sudo add-apt-repository -y ppa:ansible/ansible
  sudo apt-get update
  sudo apt-get install -y ansible
fi
