var Speech = require('./speech.js');

Speech.asyncRecognizeGCSWords("gs://bkitano-audio/Audio/mono.wav", "LINEAR16", "en-IN");