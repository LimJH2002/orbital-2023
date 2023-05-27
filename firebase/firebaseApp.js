import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBL_7OqbwBKtqR5FJHFj11Ay5ENCyKsPXE",
    authDomain: "finforce-o.firebaseapp.com",
    projectId: "finforce-o",
    storageBucket: "finforce-o.appspot.com",
    messagingSenderId: "487993412863",
    appId: "1:487993412863:web:bfb24ea755ea9913f490ca",
    measurementId: "G-JHD0Y2CSY4",
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  // Export function to initialize firebase
  export const initFirebase = () => {
      return app;
  }