import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground, TextInput, Alert } from 'react-native';
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

  const [user, setUser] = useState({});

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    console.log(token);
    const res = await axios(`${URL}users/me`, {
      headers: {
        ContentType: 'application/json',
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log(res.data.userinfo)
    const { email: emailInfo, username: userName } = res.data.userinfo;
    setUser({ ...user, emailInfo, userName });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  const { emailInfo, userName } = user;
  console.log(email);
  const submitForm = async e => {
    const token = await AsyncStorage.getItem('AccessToken');
    // 모두 입력하지 않은경우
    if (username === '' && email === '' && password === '' && repassword === '') {
      return;
    }
    if (password === '' && repassword === '') {
      Alert.alert('비밀번호는 필수로 입력하셔야 합니다.');
    }
    if (username === '' && email === '' && password !== '' && repassword !== '') {
      console.log(userName, emailInfo);
      const res = await axios.patch(
        'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
        { userName, emailInfo, password },
        { headers: { ContentType: 'application/json', authorization: `Bearer ${token}` }, withCredentials: true }
      );
      if (res.status === 200) {
        Alert.alert('정보 수정이 완료되었습니다.');
        return;
      }
    }
    const userInfo = {
      username: username ? username : userName,
      email: email ? email : emailInfo,
      password,
    };
    if (username === '' && email && password && repassword) {
      await axios
        .patch(
          'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
          {
            userName,
            email,
            password,
          },
          { headers: { ContentType: 'application/json', authorization: `Bearer ${token}` }, withCredentials: true }
        )
        .then(res => {
          console.log(res);
          Alert.alert('성공적으로 변경되었습니다.');
        });
    }

    await axios
      .patch('http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage', userInfo, {
        headers: {
          ContentType: 'application/json',
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(data => {
        console.log(data.status);
        if (data.status === 200) {
          Alert.alert(`성공적으로 변경되었습니다.`);
        }
      });
  };

  const dispatch = useDispatch();
  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    dispatch(reqSignOut(token));
    AsyncStorage.clear();
    Update.reloadAsync();
  };
  const logOutHandler = async () => {
    getToken();
  };
  // const submitForm = () => {
  //   console.log('hi?')
  // }
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 60,
        // marginTop: 20
      }}
    >
      <TouchableOpacity
        style={{
          // justifyContent: 'space-around',
          backgroundColor: 'white',
          width: 100,
          borderRadius: 20,
          marginVertical: 60,
          marginLeft: '50%',
          // flex: .3
        }}
        onPress={logOutHandler}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingVertical: 10,
            // paddingHorizontal: 10,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
      <UserInfomation style={{ justifyContent: 'space-around', marginVertical: 20, marginBottom: 20 }}>
        <TextInput
          style={{
            width: '90%',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
          placeholder={`${userName}님 여기를 눌러주세요!!!`}
          placeholderTextColor={'black'}
          onChange={e => changeDetector(e, 'username')}
        />
        <TextInput
          style={{
            width: '90%',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
          placeholder={emailInfo}
          placeholderTextColor={'black'}
          onChange={e => changeDetector(e, 'email')}
        />
        <TextInput
          secureTextEntry
          style={{
            width: '90%',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
          placeholder="Password"
          onChange={e => changeDetector(e, 'password')}
        />
        <TextInput
          secureTextEntry
          style={{
            width: '90%',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
          placeholder="Repassword"
          onChange={e => changeDetector(e, 'repassword')}
        />
        {/* {username === '' || email === '' || password === '' || repassword === '' ? <Text> '모든 정보를 입력해주세요'</Text> : null} */}
        <TouchableOpacity
          style={{
            // justifyContent: 'space-around',
            backgroundColor: 'white',
            width: '80%',
            // height: 50,
            borderRadius: 6,
            marginVertical: 20,
          }}
          onPress={e => submitForm(e)}
        >
          <Text style={{ textAlign: 'center', paddingVertical: 10, fontWeight: 'bold' }}>회원정보 수정</Text>
        </TouchableOpacity>
      </UserInfomation>
      <TouchableOpacity
        style={{
          justifyContent: 'space-around',
          // flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 6,
          marginBottom: 10,
          marginLeft: '45%',
        }}
        onPress={() => navigation.navigate('Resign')}
      >
        <Text style={{ textAlign: 'center', paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 10 }}>회원탈퇴</Text>
      </TouchableOpacity>
      <View style={{ flex: 0.2 }}></View>
    </View>
  );
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
const Btns = styled.View``;
