
if [ -z "$CR_API_TOKEN" ]; then
	echo "CR_API_TOKEN not set!!!!!!"
	exit 1;
fi

export INFLUX_HOST=localhost
export INFLUX_USER=someuser
export INFLUX_PASSWORD=somepass
export INFLUX_PORT=8086
export INFLUX_PROTOCOL=http

echo `date` >> run.log
node index.js

