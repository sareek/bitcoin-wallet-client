import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyANTAV1KlnkozCA2HGS8Emee_nFFbE6_ig',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
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
