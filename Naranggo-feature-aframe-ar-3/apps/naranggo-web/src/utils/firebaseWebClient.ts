// 우선 모바일 고려기 떄문에 RN에서 처리할 예정으로 보류 코드.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCRojxY1auozVlwc-CJ_VDXp87tj0LGSLA',
  authDomain: 'nrg2-1839f.firebaseapp.com',
  projectId: 'nrg2-1839f',
  storageBucket: 'nrg2-1839f.appspot.com',
  messagingSenderId: '566611453678',
  appId: '1:566611453678:web:3af52a8b92425267c635ff',
  measurementId: 'G-ZRZ9FRPDGT'
};

// Initialize Firebase
const firebaseWeb = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseWeb);

export { firebaseWeb, firebaseAuth };
