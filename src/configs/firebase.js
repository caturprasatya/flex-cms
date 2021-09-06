import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCBscLVutYt2_CdLAxPJKIbdNKMPtg77iA',
  authDomain: 'web-flex-92b3c.firebaseapp.com',
  projectId: 'web-flex-92b3c',
  storageBucket: 'web-flex-92b3c.appspot.com',
  messagingSenderId: '468834107383',
  appId: '1:468834107383:web:4e766452a0abd932c5b8f2'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
