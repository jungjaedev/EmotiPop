import React, { useEffect } from 'react';
import { 
    Button, 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Update from "expo-updates";
import {reqSignOut, reSignIn} from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function MyPage({navigation}) {
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    // console.log('ads')
    const token = await AsyncStorage.getItem('AccessToken')
    dispatch(reqSignOut(token))
    // AsyncStorage.clear()
    // const res = await AsyncStorage.getAllKeys()
    // location.reload()
    Update.reloadAsync()
    // console.log(res)
  }
  
  //! Token owner Test
  // const logg = async() => {
  //   try {
  //     const token = await AsyncStorage.getItem('AccessToken')
  //     dispatch(reSignIn(token))
  //   } catch(err) {
  //   throw new Error(err)
  //   }
  // }

  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 60
    }}>
      <Text style={{flex: 1}}>MyPage</Text>
      <TouchableOpacity style={{flex: 4}} onPress={logOutHandler}>
        <Text>SignOut</Text>
      </TouchableOpacity>
      {/* <Nav /> */}
    </View>
  );
}