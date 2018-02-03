var Speech = require("./speech.js");
    
var fileNames = [
    'EFL Interview 1.wav',
    'Sinharaja Walk 1 Enviro.wav',
    'Sinharaja Walk 1.wav',
    'Transparency Maldives Audio Stitch.wav',
    'UNDP Interview.wav',
    'ECO V Interview.wav',
    'ECO V Post-Interview.wav',
    'ECO V Pre-Interview.wav',
    'EFL Interview 2.wav',
    'RP Jayantha Interview.wav',
    'RP John Interview 1.wav',
    'RP John Interview 2.wav',
    'RP John Interview Full.wav',
    'Sinharaja Forest Interview.wav',
    'Sinharaja Walk 2.wav',
    'Sinharaja Walk John 1.wav',
    'Tea Factory Interview 2.wav',
    'Tea Factory Interview.wav',
    'Tea Factory Pre-Interview.wav',
    'Tea Factory Tour.wav'
]

/*
for(var i = 0 ; i < fileNames.lengths; i++) {
    try {
        const gcsUri = ""
    }
    catch(err) {
        console.log("Couldn't transcribe " + fileNames[i] + "; error: " + err);
    }
}
*/

Speech.listenAndWrite("gs://bkitano-audio/Audio/Audio for Brian/mono.wav", "en-IN", "TEST");