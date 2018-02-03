var Speech = {
  listenAndWrite: function(
      gcsUri,
      languageCode,
      nameInFirebase
    ) {
      // [START speech_async_recognize_gcs_words]
      // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fire = require("./fire");
    
    
    
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
        encoding: "LINEAR16",
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
          
          const transcription = response.results.map(result => {
            return result.alternatives[0].transcript; // get the transcript component
          }).join('\n');
          
          const wordTimes = response.results.map(result => {
            /** results is an array of "alternatives"
            alternatives has "transcript" (string), "confidence" (float), and "words" (object)
            words is an object of {startTime, endTime, word}
            if we are passing in "result" to map, we'll return a new array
            so if we were to write :: return result.alternatives[0].words ::,
            we'd return an array of arrays. What we want is to write a single array 
            to the database, so if we merge all the arrays together, we'll get something
            nice.
            
            It looks like the structure of the "words" object is a little more complicated;
            
            */
            
            // for each word object in the words array,
            const denature = result.alternatives[0].words.map(wordInfo => {
              
              // return just this info,
              return {
                word: wordInfo.word,
                startTime: parseFloat(wordInfo.startTime.seconds + '.' + wordInfo.startTime.nanos / 100000000),
                endTime: parseFloat(wordInfo.endTime.seconds + '.' + wordInfo.endTime.nanos / 100000000)
              }
            }) // and make it back into a larger array,
            
            return denature;
            
          }).reduce( (a,b) => a.concat(b)); // which we will then concatenate into a gigantic array.
          
          // console.log(wordTimes);
          
          const processedData = {
            transcription: transcription,
            wordTimes: wordTimes
          }
          
          return processedData;
        }).then(processedData => {
          // console.log(transcription);
          // console.log("END OF TRANSCRIPTION");
          
          // create a reference and write to the firebase database
          fire.database().ref('transcripts/' + nameInFirebase).set({
            title: nameInFirebase,
            transcript: processedData.transcription,
            wordTimes: processedData.wordTimes
          });
          
        }).catch(err => {
          console.error('ERROR:', err);
        });
      // [END speech_async_recognize_gcs_words]
  }
}

module.exports = Speech;

