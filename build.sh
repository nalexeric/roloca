#!/bin/bash

docker build -t registry.gitlab.com/coldfuse-oss/roloca:v2 .
docker push registry.gitlab.com/coldfuse-oss/roloca:v2
