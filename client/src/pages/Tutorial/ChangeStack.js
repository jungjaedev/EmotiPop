import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import TutorialStack from './TutorialStack';
import MainStack from '../Home/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reSignIn } from '../../modules/user';

export default function ChangeStack() {
  const user = useSelector(state => state.user.signIn);
  const dispatch = useDispatch();

  // const dispatch = useDispatch();

  const test = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token, '- - - - - - - - ');
    if (token) {
      dispatch(reSignIn(token));
    }
  };
  useEffect(() => {
    test();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar />
      {/* {
        ani 
        ? <TutorialPage1 /> 
        : user.isLogin && !ani ? <MainStack /> : <TutorialStack /> 
      } */}
      {user.isLogin ? <MainStack /> : <TutorialStack />}
    </NavigationContainer>
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
const Head = styled.View`
  background-color: yellow;
`;
