import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAj2Et1A2DrQpAh9nmr8AGVl6VarxzCFmY',
  authDomain: 'flex-cms-af258.firebaseapp.com',
  projectId: 'flex-cms-af258',
  storageBucket: 'flex-cms-af258.appspot.com',
  messagingSenderId: '981748338665',
  appId: '1:981748338665:web:058b26936e6415e10c4578'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
