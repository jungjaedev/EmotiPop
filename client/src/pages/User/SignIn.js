import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Alert 
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage/src'; 
import axios from 'axios';
import reqSignIn from '../../modules/user';


export default function SignIn() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  // console.log(user)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const { email, password } = userInfo;

  const changeEmail = useCallback((e) => {
    const email = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      email
    })
    // console.log(userInfo)
  }, [])

  const changePass = (e) => {
    const password = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      password
    })
    // console.log(userInfo)
  }

  // const onSubmit = async () => {
  //   // console.log('Clicked')
  //   try {
  //     const req = await axios('http://localhost:8080/users/signin', 
  //     { email, password }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }, withCredentials: true
  //     })
  //     if(!req.message === 'Login Completed') {
  //       Alert.alert('Email or password is not correct!')
  //       throw new Error('Something went wrong')
  //     }
  //     try {
  //       const stringify = JSON.stringify(req.accessToken)
  //       await AsyncStorage.setItem('Token', stringify)
  //     } catch(err) {
  //       throw new Error(err)
  //     }
  //     const userInfo = req.userinfo;
  //     dispatch({ type: SIGN_IN, userInfo})
  //     setUserInfo({
  //       email: '',
  //       password: ''
  //     })
  //   } catch(err) {
  //     throw new Error(err)
  //   }
  // }
  const onSubmit = () => {
    // console.log(userInfo)
    reqSignIn(userInfo)
    console.log(user)
  }



  return (
    <Container>
      <LoginForm>
        <Header>로그인</Header>
        <Input 
          placeholder="email" 
          value={email}
          name='email'
          keyboardType='email-adress'
          onChange={changeEmail}
        />
        <Input 
        placeholder="password"
        secureTextEntry
        name='password'
        onChange={changePass}
        value={password}
        />
        <MiddleContainer>
          <TouchableOpacity onPress={onSubmit}>
            <MiddleText>계정이 없으신가요?</MiddleText>
          </TouchableOpacity>
          <TouchableOpacity>
            <MiddleText>GOOGLE로 로그인 하기</MiddleText>
          </TouchableOpacity>
        </MiddleContainer>
        <Btn name='Log In' onPress={onSubmit}/>
        {/* <Btn title='Log In' onPress={onSubmit} color="#f194ff"/> */}
      </LoginForm>
    </Container>
  );
}

const Container = styled.View`
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  width: 100%;
  /* flex: 1; */
  background-color: #ddd
`
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin: auto
  /* margin-top: -300px; */
  `
const Input = styled.TextInput`
  background-color: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  /* border: none; */
  `
const LoginForm = styled.View`
  width: 70%;
  /* background-color: #eee; */
`
const MiddleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const MiddleText = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: black;
`

/* const Btn = styled.Button`
  margin-top: 5px;
` */