import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase/app';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import keys from './keys';

const firebaseConfig = {
  apiKey: keys.firebaseKey,
  authDomain: 'the-programmys-dev.firebaseapp.com',
  databaseURL: 'https://the-programmys-dev.firebaseio.com',
  projectId: 'the-programmys-dev',
  storageBucket: 'the-programmys-dev.appspot.com',
  messagingSenderId: '1015485657289',
  appId: '1:1015485657289:web:30fa2d5beac234eb',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
