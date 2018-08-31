#!/bin/bash
export GF_AUTH_ANONYMOUS_ENABLED=true

echo "Grafana port set to $GF_SERVER_HTTP_PORT"
echo "Starting Grafana"
/run.sh

