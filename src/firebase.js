import { firebase } from '@firebase/app'
import '@firebase/storage'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD3Ch0FKywgWu_qFMVvJJzs5hjymCVBK60",
    authDomain: "hey-chat-fbd1e.firebaseapp.com",
    projectId: "hey-chat-fbd1e",
    storageBucket: "hey-chat-fbd1e.appspot.com",
    messagingSenderId: "798131774873",
    appId: "1:798131774873:web:dfb0758045e8b3e9a4df08"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()

export { storage }