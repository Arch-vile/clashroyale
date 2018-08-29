#!/bin/bash
export GF_AUTH_ANONYMOUS_ENABLED=true

export GF_SERVER_HTTP_PORT=$PORT
echo "Port set to $PORT"
echo "Grafana port set to $GF_SERVER_PORT"
echo "Starting Grafana"
/run.sh

