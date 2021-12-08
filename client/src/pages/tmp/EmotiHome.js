import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useSelector, useDispatch } from 'react-redux';
import {reSignIn} from '../../modules/user'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Btn from '../User/Button'
import { Fontisto } from '@expo/vector-icons'
// import RouterPrac from '../RouterPrac'



export default function EmotiHome({ navigation }) {
  const user = useSelector(state => state.user.signIn)
  // console.log(user)
  const dispatch = useDispatch();



  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token
  }
  
  useEffect(() => {
    try{
      const token = getToken()
      // const token = await AsyncStorage.getItem('AccessToken')
      if(!token) {
        return
      }
      dispatch(reSignIn(token))
    } catch(err) {
      throw new Error(err)
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', justifyContent: 'space-evenly', marginTop: -120}}>
      <Text style={{fontSize:30, marginVertical: 100}}>Welcome EmotiLand!!</Text>
      <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'space-between'}}>
        {
          !user.isLogin ?  (
            <Btn
              name='SignIn'
              title="SignIn"
              onPress={() => navigation.navigate('SignIn')}
            />
          )
          : null
        }
        <Btn
          name='SignUp'
          title="SignUp"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Btn name='Chart' onPress={() => navigation.navigate('ChartContainer')}/>
        <Btn
          name='ChooseRoom'
          title="ChooseRoom"
          onPress={() => navigation.navigate('ChooseRoom')}
        />
      </View>
      
      {/* <Btn 
        name='ChooseRoom'
        title='ChooseRoom'
        onPress={() => navigation.navigate('ChooseRoom')}
      /> */}
    </View>
  );
}