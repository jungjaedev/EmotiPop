import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Update from 'expo-updates';
import { reqSignOut, reSignIn } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MyPage({ navigation }) {
  const [editInfoForm, setEditInfoForm] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const { username, email, password, repassword } = editInfoForm;
  // useSelector(state => state.user.accessToken);
  function changeDetector(e, name) {
    const value = e.nativeEvent.text;
    setEditInfoForm({
      ...editInfoForm,
      [name]: value,
    });
  }

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
        <Text style={{ flex: .6, fontSize: 30, marginVertical: 40 }}>MyPage</Text>
      <TouchableOpacity style={{ 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: 70, 
        height: 40, 
        textAlign: 'center', 
        fontSize: 20, 
        borderRadius: 10}} 
        onPress={logOutHandler}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <UserInfomation style={{ flex: 8, flexDirection: 'column', justifyContent: 'space-around' }}>
        <Text>이름</Text>
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder='Name' onChange={e => changeDetector(e, 'username')} />
        <Text>이메일</Text>
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder='Email' onChange={e => changeDetector(e, 'email')} />
        <Text>비밀번호</Text>
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder='Password' onChange={e => changeDetector(e, 'password')} />
        <Text>비밀번호 확인</Text>
        <TextInput style={{ 
          width: '90%', 
          borderBottomColor: 'black', 
          borderBottomWidth: 2 }} 
          placeholder='Repassword' onChange={e => changeDetector(e, 'repassword')} />
          {/* {password && repassword !== repassword ? <Text> '비밀번호가 일치하지 않습니다'</Text> : null} */}
        <TouchableOpacity style={{ 
          justifyContent: 'space-around', 
          backgroundColor: 'white', 
          width: 200, 
          height: 50, 
          textAlign: 'center', 
          fontSize: 20, 
          borderRadius: 10}} 
          onPress={e => submitForm(e)}>
          <Text>회원정보 수정</Text>
        </TouchableOpacity>
      </UserInfomation>
      <TouchableOpacity style={{ 
        justifyContent: 'space-around', 
        flexDirection: 'column', 
        backgroundColor: 'white', 
        width: 70, 
        height: 40, 
        textAlign: 'center', 
        fontSize: 20, 
        borderRadius: 10, 
        marginBottom: 10}} 
        onPress={() => navigation.navigate('Resign')}>
        <Text>회원탈퇴</Text>
      </TouchableOpacity>
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
