import * as sapper from "@sapper/app";

firebase.initializeApp({
  apiKey: "AIzaSyBW8qzldY8CASRTQvwa9JiXEobzUAtoCY0",
  authDomain: "thesocialevidence.firebaseapp.com",
  databaseURL: "https://thesocialevidence-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thesocialevidence",
  storageBucket: "thesocialevidence.appspot.com",
  messagingSenderId: "610883182336",
  appId: "1:610883182336:web:e2c827e84eec79b4301de5",
  measurementId: "G-DG764434JN",
});
firebase.app();
firebase.auth();
firebase.database();
firebase.analytics();

sapper.start({ target: document.querySelector("#sapper") });
