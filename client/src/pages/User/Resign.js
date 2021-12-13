import React from "react";
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { Link } from "react-router-dom";
import styled from 'styled-components/native';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function Resign ({navigation}) {
  const DeleteUser = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token)
    const userInfo = await axios.get(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage`, {
      headers: {
        'ContentType': 'application/json',
        authorization: `Bearer ${token}`
      },
      withCredentials: true
    })

    console.log(userInfo)

    await axios.delete(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/users/${user_id}`,
      {
        headers: {
          ContentType: 'application/json',
          authorization: `Bearer ${token}`,
      },
    withCredentials: true,}
    )
    .then(res => {
      console.log(res)
      console.log('회원탈퇴가 완료되었습니다.')
      navigation.navigate('MyPage')
    })
    .catch(err => console.log(error))
  }

  return (
    // <ImageBackground source={require('../../img/background.jpeg')} resizemode="cover">
    //   <View
    //     style={{
    //       alignItems: 'center',
    //       justifyContent: 'space-between',
    //       width: SCREEN_WIDTH,
    //       height: SCREEN_HEIGHT - 80,
    //       marginTop: '20px',
    //     }}
    //   >
    //     <Text style={{ textAlign: 'center', marginTop: 250, fontSize: 20 }}>탈퇴하시겠습니까?</Text>
    //     <View style={{ flexDirection: 'row', marginBottom: 350}}>
    //       <TouchableOpacity 
    //         style={{ 
    //           justifyContent: 'space-around', 
    //           backgroundColor: 'white', 
    //           width: 70, 
    //           height: 40, 
    //           textAlign: 'center', 
    //           fontSize: 20, 
    //           borderRadius: 10, 
    //           marginRight: 15}} 
    //           onPress={e => DeleteUser(e)}>
    //         <Text>예</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity 
    //         style={{ 
    //           justifyContent: 'space-around', 
    //           backgroundColor: 'white', 
    //           width: 70, 
    //           height: 40, 
    //           textAlign: 'center', 
    //           fontSize: 20, 
    //           borderRadius: 10, 
    //           marginLeft: 15}} 
    //           onPress={() => navigation.navigate('MyPage')}>
    //         <Text>아니오</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </ImageBackground>
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