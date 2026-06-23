import packageJson from '../../package.json';

export const environment = {
  appVersion: packageJson.version,
  coinCapApi: 'https://m2lkcntk23.execute-api.eu-west-2.amazonaws.com/test',
  production: false,
  firebase: {
    apiKey: 'AIzaSyDMLCGUl0TsERiF1NXIiXYdeI3Boe7Zu98',
    authDomain: 'jp-2026-schedule-comment-f5d2a.firebaseapp.com',
    projectId: 'jp-2026-schedule-comment-f5d2a',
    storageBucket: 'jp-2026-schedule-comment-f5d2a.firebasestorage.app',
    messagingSenderId: '273666579153',
    appId: '1:273666579153:web:91122699a96964d9d203f0',
    measurementId: 'G-Z1WYC4LQXE',
  },
};
 