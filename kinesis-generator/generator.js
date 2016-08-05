var AWS = require('aws-sdk');

var settings = {
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  kinesis: {
    streamName: process.env.STREAM_NAME
  }
};

console.log('Producer config:' + JSON.stringify(settings));

var kinesis = new AWS.Kinesis({
  region: settings.aws.region,
  accessKeyId: settings.aws.accessKeyId,
  secretAccessKey: settings.aws.secretAccessKey
});

var POOLING_TIME = 1000; // 1 second
var MESSAGES_PER_BATCH = 100;

function sendMessage() {
  var data = {
    StreamName: settings.kinesis.streamName,
    Records: [
    ]
  };

  for (var i = 0; i < MESSAGES_PER_BATCH; i++) {
    data.Records.push({
      Data: 'Producer: sample data ' + new Date().getTime() + '_' + i,
      PartitionKey: 'demo-producer'
    });
  }

  kinesis.putRecords(data, function (err, result) {
    if (err) {
      console.error('Error: ' + JSON.stringify(err));
      return;
    }

    console.log('Producer: messages sent to kinesis');
  });

  setTimeout(sendMessage, POOLING_TIME);
}

sendMessage();
