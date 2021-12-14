import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './src/modules';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'react-native-gesture-handler';

// import NavContainer from './src/pages/Home/NavContainer'
// import TutorialHome from './src/pages/Tutorial/TutorialHome';
import ChangeStack from './src/pages/Tutorial/ChangeStack';
import { WebView } from 'react-native-webview';
import CalendarContainer from './src/pages/Calendar/CalendarContainer';
import MyPage from './src/pages/User/MyPage';
import Resign from './src/pages/User/Resign';

import TutorialPage1 from './src/pages/Tutorial/TutorialPage1';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default function App() {
  const [ani, setAni] = useState(true);
  const timer = () => setTimeout(() => setAni(false), 5500)

  useEffect(() => {
    // setTimeout(() => {
    //   setAni(false);
    // }, 3000)
    timer()
  }, [])

  return (
    <Provider store={store}>
      <StatusBar style='dark' />
      {
        ani ? <TutorialPage1 /> : <ChangeStack />
      }
      {/* <ChangeStack /> */}
    </Provider>
  );
}
