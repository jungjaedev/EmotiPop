import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './src/modules'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import SignIn from './src/pages/User/SignIn'
import SignUp from './src/pages/User/SignUp'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='dark' />
        <SignIn />
        {/* <SignUp /> */}
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
