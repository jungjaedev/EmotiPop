import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './src/modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'react-native-gesture-handler';

// import NavContainer from './src/pages/Home/NavContainer'
// import TutorialHome from './src/pages/Tutorial/TutorialHome';
import ChangeStack from './src/pages/Tutorial/ChangeStack'
import { WebView } from 'react-native-webview';
import CalendarContainer from './src/pages/Calendar/CalendarContainer';
import MyPage from './src/pages/User/MyPage';


import ChangeStack from './src/pages/Tutorial/ChangeStack';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='dark' />
        <ChangeStack />
    </Provider>
  );
}
