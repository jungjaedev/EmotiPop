import React from "react";
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions } from 'react-native';
import { Link } from "react-router-dom";
import Styled from 'styled-components';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function Resign ({navigation}) {
  const DeleteUser = async (e) => {
    await axios.delete('http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
      {params: {
        id: id,
        email: email,
        username: username,
        password: password
      },
    withCredentials: true,}
    )
    .then(() => {
      console.log('회원탈퇴가 완료되었습니다.')
      navigation.navigate('Mypage')
    })
    .catch(err => console.log(error))
  }

  return (
    <ImageBackground source={require('../../img/background.jpeg')} resizemode="cover">
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 80,
        marginTop: '20px',
      }}
    >
    <Text style={{ textAlign: 'center', marginTop: '250px', fontSize: '20px' }}>탈퇴하시겠습니까?</Text>
    <View style={{ flexDirection: 'row', marginBottom: '350px'}}>
      <TouchableOpacity 
      style={{ 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: '70px', 
        height: '40px', 
        textAlign: 'center', 
        fontSize: '20px', 
        borderRadius: '10px', 
        marginRight: '15px'}} 
        onPress={e => DeleteUser(e)}>
          <Text>예</Text>
          </TouchableOpacity>
      <TouchableOpacity 
      style={{ 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: '70px', 
        height: '40px', 
        textAlign: 'center', 
        fontSize: '20px', 
        borderRadius: '10px', 
        marginLeft: '15px'}} 
        onPress={() => navigation.navigate('MyPage')}>
          <Text>아니오</Text>
          </TouchableOpacity>
    </View>
    </View>
    </ImageBackground>
  )
}

export default Resign;