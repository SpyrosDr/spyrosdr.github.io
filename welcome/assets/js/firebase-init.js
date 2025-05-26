// Firebase SDK should already be loaded before this file runs

const firebaseConfig = {
  apiKey: "AIzaSyAtABHYMrBLich7vGedXQ4F3ahBgv07eDU",
  authDomain: "dragonson-46c50.firebaseapp.com",
  databaseURL: "https://dragonson-46c50-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dragonson-46c50",
  storageBucket: "dragonson-46c50.firebasestorage.app",
  messagingSenderId: "595136654471",
  appId: "1:595136654471:web:54a4fe587c730fa3bd9c22",
  measurementId: "G-0NV8EQ508S",
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
