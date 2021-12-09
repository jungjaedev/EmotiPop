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
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function MyPage({navigation}) {
  const logOutHandler = async () => {
    // console.log('ads')
    AsyncStorage.clear()
    const res = await AsyncStorage.getAllKeys()
    // location.reload()
    Update.reloadAsync()
    // console.log(res)
  }

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