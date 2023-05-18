// 우선 모바일 고려기 떄문에 RN에서 처리할 예정으로 보류 코드.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApyu8nTOlY_LVSA2sGnvaoWQ52VrVtIR8',
  authDomain: 'ndream-naranggo.firebaseapp.com',
  databaseURL: 'https://ndream-naranggo.firebaseio.com',
  projectId: 'ndream-naranggo',
  storageBucket: 'ndream-naranggo.appspot.com',
  messagingSenderId: '706024078559',
  appId: '1:1089379454652:android:f9bbb7819843f382994ab9'
};

const publicKey =
  'BC4vpikMkKB4T6R-ebwyqmKSH4VbSMX4yVezGEyAGybYIwVs7Wd7AgriAywavlSVnt6TFm1XLHdP1LfvcW1lcgM';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(firebaseApp);
getToken(messaging, { vapidKey: publicKey })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.'
      );
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
