# Kinesis Interface demo

This is a sample environment developed with Docker and Node.js to show how the [Kinesis Interface](https://github.com/scup/kinesis-interface) works.

To execute this demo execute the following steps:

### 1. Setup AWS Keys

Go to docker-compose.yml and change the variables below in generator and kinesis-interface container definitions:
- AWS_REGION: choose the region where you created the Kinesis stream
- AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY: enter the keys of a user which can access the stream

### 2. Define the stream name

- Go to docker-compose.yml and add the stream name in STREAM_NAME variable of generator container definiton
- Go to kinesis-interface/example-app.properties and change the streamName option

### 3. Start docker environment

*ATTENTION!* Be sure that you have docker and docker-compose installed in your machine!

In command line execute the following commands:

```bash
# build the containers
docker-compose build

# start the containers
docker-compose up
```

After the KCL starts, you will see the generator sending messages to Kinesis:

```
generator_1 | Producer: messages sent to kinesis
```

The KCL using the Kinesis Interface processor to forward data to the consumer:

```
...
kinesis-interface_1 | INFO: Starting: Reading next message from STDIN for shardId-000000000000
kinesis-interface_1 | Aug 05, 2016 7:24:39 PM com.amazonaws.services.kinesis.multilang.MultiLangProtocol validateStatusMessage
kinesis-interface_1 | INFO: Received response {"action":"status","responseFor":"processRecords"} from subprocess while waiting for processRecords while processing shard shardId-000000000000
kinesis-interface_1 | Aug 05, 2016 7:24:40 PM com.amazonaws.services.kinesis.multilang.MessageWriter writeMessage
kinesis-interface_1 | INFO: Writing ProcessRecordsMessage to child process for shard shardId-000000000000
kinesis-interface_1 | Aug 05, 2016 7:24:40 PM com.amazonaws.services.kinesis.multilang.MessageWriter$1 call
kinesis-interface_1 | INFO: Message size == 51339 bytes for shard shardId-000000000000
kinesis-interface_1 | Aug 05, 2016 7:24:40 PM com.amazonaws.services.kinesis.multilang.LineReaderTask call
kinesis-interface_1 | INFO: Starting: Reading next message from STDIN for shardId-000000000000
...
```

The consumer receiving data from KCL:

```
...
consumer_1 | Consumer: reading data...
consumer_1 | 300 kinesis records received
...
```
