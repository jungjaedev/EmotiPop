import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './src/modules'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import 'react-native-gesture-handler';
import NavContainer from './src/pages/Home/NavContainer'
import RouterPrac from './src/pages/RouterPrac'
import kakaoLogin from './src/pages/Home/KakaoLogin';
import { WebView } from 'react-native-webview';



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style='dark' />
      <NavContainer />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
