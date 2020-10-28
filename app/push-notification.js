import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyANTAV1KlnkozCA2HGS8Emee_nFFbE6_ig',
    authDomain: 'medicrony-219504.firebaseapp.com',
    databaseURL: 'https://medicrony-219504.firebaseio.com',
    projectId: 'medicrony-219504',
    storageBucket: 'medicrony-219504.appspot.com',
    messagingSenderId: '965872092156',
  });

  // navigator.serviceWorker
  //     .register('/firebase-messaging-sw.js')
  //     .then((registration) => {
  //         firebase.messaging().useServiceWorker(registration);
  //     });
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (error) {
    console.error(error);
  }
};
