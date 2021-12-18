import React from "react";
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions, Pressable, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as Update from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function Resign ({navigation}) {
  const DeleteUser = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token, ' - - - - - -  - - - - -')
    const userInfo = await axios.get(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/users/me`, {
      headers: {
        'ContentType': 'application/json',
        authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    const user_id = userInfo.data.userinfo.id;
    console.log(user_id, ' --- - - - - - - -  -')

    const res = await axios.delete(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/users/${user_id}`,
      {
        headers: {
          ContentType: 'application/json',
          authorization: `Bearer ${token}`,
      },
    withCredentials: true,}
    )
    if(res.status === 200) {
      Alert.alert('다음에 또 만나요...ㅠ')
      Update.reloadAsync()
    }
    // .then(res => {
    //   console.log(res)
    //   console.log('회원탈퇴가 완료되었습니다.')
    //   // navigation.navigate('MyPage')
    // })
    // .catch(err => console.log(error))
  }

  return (
    <ImageBackground 
      source={require('../../img/background.jpeg')} 
      style={{
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT
      }}>
      <Container>
        <View>
          <Head>
            탈퇴하시겠습니까?
          </Head>
        </View>
        <BtnContainer>
          <Btn onPress={DeleteUser}>
            <BtnTxt>
              예
            </BtnTxt>
          </Btn>
          <Btn onPress={() => navigation.goBack()}>
            <BtnTxt>
              아니오
            </BtnTxt>
          </Btn>
        </BtnContainer>
      </Container>
    </ImageBackground>
  )
}
const Container = styled.View`
  align-items: center;
`
const Head = styled.Text`
  /* flex:  */
  font-size: 30px;
  margin-top: 150px;
`
const BtnContainer = styled.View`
  flex-direction: row;
  margin-top: 150px;
`
const Btn = styled.TouchableOpacity`
  backgroud-color: #ddd;
  /* border: 1px solid #eee; */
  width: 60px;
  height: 40px;
  margin-right: 20px;
`

const BtnTxt = styled.Text`
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
`





export default Resign;