import React, { useState, useCallback, useRef } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';


export default function SignUp() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  // console.log(user)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    rePassword: '',
    username: '',
    notSame: false
  })
  const { email, password, rePassword, username, notSame } = userInfo;

  const emailInput = useCallback((e) => {
    const email = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      email
    })
    // console.log(userInfo)
  }, [])

  const passInput = (e) => {
    const password = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      password
    })
    // console.log(userInfo)
  }
  const rePassInput = (e) => {
    const rePassword = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      rePassword
    })
    if(password === rePassword) {
      setUserInfo({
        ...userInfo,
        rePassword,
        notSame: false
      })
    }
    // console.log(userInfo)
  }
  const passChk = () => {
    if(password !== rePassword) {
      console.log('hi?')
      setUserInfo({...userInfo, notSame: true})
      inputRef.current.focus()
    }
    return
  }
  const nameInput = (e) => {
    const username = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      username
    })
    // console.log(userInfo)
  }
  console.log(userInfo)
  const onSubmit = async () => {
    // console.log('Clicked')
    try {
      const req = await axios.post('http://localhost:8080/users/signup', 
      { email, password, username }, {
        headers: {
          'Content-Type': 'application/json',
        }, withCredentials: true
      })
      if(!req.message === 'Signup Completed') {
        Alert.alert('Email or password is not correct!')
        throw new Error('Something went wrong')
      } else if(req.message === 'Signup Completed' && req.userinfo) {
        //!  로그인 페이지로 라우팅
      }
    } catch(err) {
      // throw new Error(err)
      console.log(err, 'ㅋㅋㅋ')
    } 
  }
  
  return (
    <Container>
      <SignUpForm>
        <Header>회원가입</Header>
        <Input 
          placeholder="email" 
          value={email}
          keyboardType='email-adress'
          onChange={emailInput}
        />
        <Input 
        placeholder="password"
        secureTextEntry
        onChange={passInput}
        value={password}
        />
        <Input 
        placeholder="password"
        secureTextEntry
        onChange={rePassInput}
        value={rePassword}
        ref={inputRef}
        />
        {
          notSame ? <NotSame>비밀번호가 일치하지 않습니다.</NotSame> : null
        }
        <Input 
        placeholder="name"
        onFocus={passChk}
        onChange={nameInput}
        value={username}
        />
        <Btn name='가입하기' onPress={onSubmit}/>
        {/* <Btn title='Log In' onPress={onSubmit} color="#f194ff"/> */}
      </SignUpForm>
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
const SignUpForm = styled.View`
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
const NotSame = styled.Text`
  color: red;
`
/* const Btn = styled.Button`
  margin-top: 5px;
` */