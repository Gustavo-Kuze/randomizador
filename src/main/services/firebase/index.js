import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

var config = {
  apiKey: 'AIzaSyDB0PSBo2CR2mhRRvDFMkUCSLUTuL16WP0',
  authDomain: 'randomizador-ea6d3.firebaseapp.com',
  databaseURL: 'https://randomizador-ea6d3.firebaseio.com',
  projectId: 'randomizador-ea6d3',
  storageBucket: 'randomizador-ea6d3.appspot.com',
  messagingSenderId: '51716316975',
};

firebase.initializeApp(config);

firebase.auth().languageCode = 'pt';

export default firebase;
