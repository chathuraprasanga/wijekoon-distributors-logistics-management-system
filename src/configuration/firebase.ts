// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlWBmgd1o_ULnhePbsypfFUc7qqivDONw',
  authDomain: 'wijekoon-distributors.firebaseapp.com',
  projectId: 'wijekoon-distributors',
  storageBucket: 'wijekoon-distributors.appspot.com',
  messagingSenderId: '1016843797289',
  appId: '1:1016843797289:web:0894035e98a5616f7e6d38',
  measurementId: 'G-2BJRWY5ZSE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
