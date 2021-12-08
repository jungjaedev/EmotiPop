import { StatusBar } from 'expo-status-bar';
import React, { Children } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native'
import TutorialStack from './TutorialStack';
import MainStack from '../Home/MainStack';


export default function ChangeStack() {
  const user = useSelector(state => state.user.signIn)
  return (
    <NavigationContainer>
      <StatusBar/>
      {
        user.isLogin ? <MainStack /> : <TutorialStack />
      }
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
`