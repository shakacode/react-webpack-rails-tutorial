#!/bin/sh

GVC=ror-tutorial
LOCATION=aws-us-east-2

set_last_replica()
{
  # looks like replicas are sorted by deployment, so just pick first one
  LAST_REPLICA=$(cpln workload get-replicas $WORKLOAD --location $LOCATION --gvc $GVC | head -4 | tail -1 | tr -d "|")
}

WORKLOAD=$1

set_last_replica
cpln workload connect $WORKLOAD --location $LOCATION --gvc $GVC --replica $LAST_REPLICA
