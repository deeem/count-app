import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}

const setupEmulator = () => {
  firebase.database().useEmulator('localhost', 9000)
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.functions().useEmulator('localhost', 5001)
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)

  if (window.location.hostname === 'localhost') {
    setupEmulator()
  }
}

const db = firebase.firestore()

export { db, firebase }
