import { AppRegistry } from 'react-native';
import App from './app/App';
import messaging from '@react-native-firebase/messaging';

// App이 Background, Quit 상태일 경우. 공식 DOCS에서 가능한한 빨리 핸들러를 세팅하라고 가이드함.
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  global.message = remoteMessage;
});

AppRegistry.registerComponent('NaranggoMobile', () => App);
