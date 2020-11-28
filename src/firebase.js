import firebase from 'firebase';
import store from "./store";

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




const fire = firebase.initializeApp(firebaseConfig);
export const firedb = fire.database();


export function loadPlank() {
  const userID = store.get("database/userID");
  const plankCollection = firedb.ref("Users/" + userID + "/planks");

  plankCollection.on("value", (snapshot) => {
    let planksArray = [];

    snapshot.forEach((doc) => {
      let key = doc.key;
      let plank = doc.val();
      planksArray.push({ id: key, data: plank });
    });
    store.set("database/planks", planksArray);
  });
}

loadPlank();
 