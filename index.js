/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);



// index.js
// import React from 'react';
// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import AgoraRTC from 'react-native-agora';

// const AppWithAgora = () => {
//   AgoraRTC.initialize('');
//   return <App />;
// };

// AppRegistry.registerComponent(appName, () => AppWithAgora);
