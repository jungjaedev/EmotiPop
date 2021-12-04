import React, { useState, useCallback, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from './Button';
import {reqSignIn} from '../../modules/user'
// import Expo from "expo"
import * as Google from 'expo-google-app-auth';
import axios from 'axios'
// import { test } from '../../../../server/config/config';


export default function SignIn({navigation}) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const { email, password } = userInfo;
  // 400 에러 핸들링
  const [wrongInfo, setWrongInfo] = useState(true)

  // 이메일 인풋값 추출
  const changeEmail = (e) => {
    const email = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      email
    })
    // console.log(userInfo)
  }

  // 패스워드 인풋값 추출
  const changePass = (e) => {
    const password = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      password
    })
  }

  // 
  const del = () => {
    // setMail(emailVal.test(email))
    setWrongInfo(true)
  }

  
  const onSubmit = () => {
    if(email ==='' && password === '') {
      setWrongInfo(false)
      return
    }
    dispatch(reqSignIn(userInfo))
    setTimeout(() => {
      navigation.navigate('EmotiHome')
    },1000)
  }
  
  // const user = useSelector(state => state.user)
  // console.log(user.signIn.isLogin)
  if(user.signIn.isLogin) {
    console.log('Login Success!!')
  }
  const googleOauth = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: `122121037503-0asfns1mbs2759mv1jij9ppfk2k474hp.apps.googleusercontent.com
    `,
    });
    console.log(type, accessToken, user)    
  }
  
  
  return (
    <Container>
        {
          user.signIn.loading ? <Loading color='black' size='large'/> 
          : (
            <LoginForm> 
              <Header>로그인</Header>
              <Input 
                placeholder="email" 
                value={email}
                name='email'
                // keyboardType=''
                onChange={changeEmail}
                onFocus={del}
              />
              {/* { mail ? null : <Text>이메일 형식이 유효하지 않습니다.</Text> } */}
              <Input 
              placeholder="password"
              secureTextEntry
              name='password'
              onChange={changePass}
              value={password}
              onFocus={del}
              />
              <MiddleContainer>
                <TouchableOpacity>
                  <MiddleText onPress={() => navigation.navigate('SignUp')}>계정이 없으신가요?</MiddleText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MiddleText onPress={googleOauth}>GOOGLE로 로그인 하기</MiddleText>
                  
                </TouchableOpacity>
              </MiddleContainer>
              {
                !wrongInfo ? <Warn>아이디와 비밀번호를 확인해 주세요</Warn> : null 
              }
              <Btn name='Log In' onPress={onSubmit}/>
            </LoginForm>
          )
        }
      
    </Container>
  );
}

const Container = styled.View`
  /* justify-content: center; */
  align-items: center;
  height: 100%; 
  width: 100%;
  /* flex: 1; */
  background-color: #ddd;
`
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 150px;
  `
const Input = styled.TextInput`
  background-color: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
  /* box-sizing: border-box; */
  /* border: none; */
  `
const LoginForm = styled.View`
  width: 70%;
  /* background-color: #eee; */
`
const MiddleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`
const MiddleText = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: black;
`
const Warn = styled.Text`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`
const Loading = styled.ActivityIndicator`
  margin-top: 200px;
`
// const Web = styled.WebView`
//   color: black;
// `

/* const Btn = styled.Button`
  margin-top: 5px;
` */







// 제출 
  // const onSubmit = async () => {
  //   // console.log('Clicked')
  //   try {
  //     const req = await axios.post('http://localhost:80/users/signin', 
  //     { email, password }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }, withCredentials: true
  //     })
  //     if(!req.data.message === 'Login Completed') {
  //       Alert.alert('Email or password is not correct!')
  //       throw new Error('Something went wrong')
  //     }
  //     try {
  //       console.log(req)
  //       const stringify = JSON.stringify(req.accessToken)
  //       await AsyncStorage.setItem('Token', stringify)
  //     } catch(err) {
  //       throw new Error(err)
  //       // console.log('Warn!')
  //     }
  //     const userr = req.data.userinfo;
  //     console.log(userr)
  //     dispatch(logIn(userr))
  //     setUserInfo({
  //       email: '',
  //       password: ''
  //     })
  //   } catch(err) {
  //     // throw new Error(err)
  //     setWrongInfo(false)
  //   }
  // }