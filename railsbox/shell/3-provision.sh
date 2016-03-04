#!/bin/bash

set -e

ansible-playbook $@ /ansible/site.yml --connection=local -s
