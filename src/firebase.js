import firebase from "firebase";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDQwIXD4KTT4o0oWV-veMJtKxWxpXcjLQs",
  authDomain: "my-firebase-helloworld-01.firebaseapp.com",
  databaseURL: "https://my-firebase-helloworld-01.firebaseio.com",
  projectId: "my-firebase-helloworld-01",
  storageBucket: "my-firebase-helloworld-01.appspot.com",
  messagingSenderId: "495029373180",
  appId: "1:495029373180:web:255f915f0db98a92a8ef79",
  measurementId: "G-DFBER8H5KS"
};

var fire = firebase.initializeApp(firebaseConfig);

// export utils/refs
export default fire;
