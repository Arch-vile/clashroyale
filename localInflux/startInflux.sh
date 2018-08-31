
if [ -z "$INFLUX_DATA_PATH" ]; then
	echo "INFLUX_DATA_PATH not set!!!!!!"
	exit 1;
fi

docker run --name=localInfluxDB --rm -p 8086:8086 -v $INFLUX_DATA_PATH:/var/lib/influxdb influxdb
