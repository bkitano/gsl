function asyncRecognizeGCSWords(
  gcsUri,
  encoding,
  languageCode
) {
  // [START speech_async_recognize_gcs_words]
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');

  // Creates a client
  const client = new speech.SpeechClient({
    projectId: 'bkitano-gsl',
    keyFilename: '/home/ubuntu/workspace/gsl/src/service-account.json'
    
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const gcsUri = 'gs://my-bucket/audio.raw';
  // const encoding = 'Eencoding of the audio file, e.g. LINEAR16';
  // const sampleRateHertz = 16000;
  // const languageCode = 'BCP-47 language code, e.g. en-US';

  const config = {
    enableWordTimeOffsets: true,
    encoding: encoding,
    languageCode: languageCode,
  };

  const audio = {
    uri: gcsUri,
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  client
    .longRunningRecognize(request)
    .then(data => {
      const operation = data[0];
      // Get a Promise representation of the final result of the job
      return operation.promise();
    })
    .then(data => {
      const response = data[0];
      response.results.forEach(result => {
        console.log(`Transcription: ${result.alternatives[0].transcript}`);
        result.alternatives[0].words.forEach(wordInfo => {
          // NOTE: If you have a time offset exceeding 2^32 seconds, use the
          // wordInfo.{x}Time.seconds.high to calculate seconds.
          const startSecs =
            `${wordInfo.startTime.seconds}` +
            `.` +
            wordInfo.startTime.nanos / 100000000;
          const endSecs =
            `${wordInfo.endTime.seconds}` +
            `.` +
            wordInfo.endTime.nanos / 100000000;
          console.log(`Word: ${wordInfo.word}`);
          console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        });
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END speech_async_recognize_gcs_words]
}

asyncRecognizeGCSWords("gs://bkitano-audio/Audio/mono.wav", "LINEAR16", 'en-IN');