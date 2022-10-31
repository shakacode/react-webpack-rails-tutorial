#!/bin/sh

VERSION=latest
# VERSION=$(date +%s)

CPLN_ORG=shakacode-staging
CPLN_GVC=ror-tutorial

WORKLOAD=rails
IMAGE=ror-tutorial:${VERSION}

SCRIPT_PATH=$(dirname $0)

cpln image build --name ${IMAGE} --dockerfile "$SCRIPT_PATH/Dockerfile" --push

cpln workload update ${WORKLOAD} --set spec.containers.webapp.image=/org/${CPLN_ORG}/image/${IMAGE} --gvc ${CPLN_GVC}

if [ "$VERSION" == "latest" ]; then
  cpln workload force-redeployment ${WORKLOAD} --gvc ${GVC}
fi
