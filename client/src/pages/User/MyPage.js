import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Update from 'expo-updates';
import { reqSignOut, reSignIn } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import axios from 'axios';
import { URL } from '../../modules/user';
import { InfoIcon } from 'native-base';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MyPage({ navigation }) {
  const [editInfoForm, setEditInfoForm] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const { username, email, password, repassword } = editInfoForm;
  function changeDetector(e, name) {
    const value = e.nativeEvent.text;
    setEditInfoForm({
      ...editInfoForm,
      [name]: value,
    });
  }
  const [user, setUser] = useState({})

  const getUserInfo = async() => {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token)
    const res = await axios(`${URL}users/me`, {
      headers: {
        'ContentType': 'application/json',
        authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    console.log(res.data.userinfo)
    const { email: emailInfo, username: userName } = res.data.userinfo;
    setUser({...user, emailInfo, userName})
  }

  useEffect(() => {
    getUserInfo()
  }, [])
  const {emailInfo, userName} = user;

  const submitForm = async e => {
    // async function submitForm(e) {
    // console.log('-----------------', editInfoForm);
    // console.log('hi?')
    const token = await AsyncStorage.getItem('AccessToken');
    // console.log(111111, token);
    // e.preventDefault();
    // console.log('-----------------', 'username :', username, email, password);
    await axios
      .patch(
        'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
        {
          username,
          email,
          password,
        },
        {
          headers: {
            ContentType: 'application/json',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(data => {
        console.log(111111111155555555, data.data);
      });
    // console.log(editInfoForm);
  };

  const dispatch = useDispatch();
  const getToken = async() => {
    const token = await AsyncStorage.getItem('AccessToken');
    dispatch(reqSignOut(token));
    Update.reloadAsync()

  }
  const logOutHandler = async () => {
    getToken()
  };
  // const submitForm = () => {
  //   console.log('hi?')
  // }
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'space-around',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 60,
      // marginTop: 20
      }}>
      <TouchableOpacity style={{ 
        // justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: 70, 
        borderRadius: 6,
        marginVertical: 60, 
        marginLeft: '50%',
        // flex: .3
        }} 
        onPress={logOutHandler}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 10,}}>Log out</Text>
      </TouchableOpacity>
      <UserInfomation style={{ justifyContent: 'space-around', marginVertical: 20, marginBottom: 20 }}>
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder={`${userName}님 여기를 눌러주세요!!!`}
          placeholderTextColor={'black'}
          onChange={e => changeDetector(e, 'username')} />
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder={emailInfo}
          placeholderTextColor={'black'} 
          onChange={e => changeDetector(e, 'email')} />
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder='Password' onChange={e => changeDetector(e, 'password')} />
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2,
          }} 
          placeholder='Repassword' onChange={e => changeDetector(e, 'repassword')} />
          {/* {password && repassword !== repassword ? <Text> '비밀번호가 일치하지 않습니다'</Text> : null} */}
        <TouchableOpacity style={{ 
          // justifyContent: 'space-around', 
          backgroundColor: 'white', 
          width: '80%', 
          // height: 50, 
          borderRadius: 6,
          marginVertical: 20,
          }} 
          onPress={e => submitForm(e)}>
          <Text style={{textAlign: 'center', paddingVertical: 10, fontWeight: 'bold'}}>회원정보 수정</Text>
        </TouchableOpacity>
      </UserInfomation>
      <TouchableOpacity style={{ 
        justifyContent: 'space-around', 
        // flexDirection: 'column', 
        backgroundColor: 'white', 
        borderRadius: 6, 
        marginBottom: 10,
        marginLeft: '45%',
        }} 
        onPress={() => navigation.navigate('Resign')}>
        <Text style={{textAlign: 'center', paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 10}}>회원탈퇴</Text>
      </TouchableOpacity>
      <View style={{flex: .2}}></View>
    </View>
  )
}

const UserInfomation = styled.View`
  flex: auto;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  align-items: center;
  height: 150px;
  width: 300px;
`;
const Btns = styled.View`
  
` 