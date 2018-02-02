import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7iuLWI-sVv6_EOSZmQpf1Dtp12L0rcf8",
    authDomain: "new-gsl.firebaseapp.com",
    databaseURL: "https://new-gsl.firebaseio.com",
    projectId: "new-gsl",
    storageBucket: "",
    messagingSenderId: "930091450579"
};

var fire = firebase.initializeApp(config);

export default fire;