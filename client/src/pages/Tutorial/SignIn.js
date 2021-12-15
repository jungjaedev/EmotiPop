import React, { useState, useCallback, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Pressable
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from '../User/Button';
import { reqSignIn, googleSignIn } from '../../modules/user'
import PassModal from './PassModal';
import axios from 'axios';
// import Expo from "expo"

const { width: SCREEN_WIDTH } = Dimensions.get('window');


export default function SignIn({navigation}) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const [modal, setModal] = useState(false);
  const { email, password } = userInfo;

// 이메일 유효성 검사
  const [emailVal, setEmailVal] = useState(true);
  const emailValid = () => {
    const emailChk = /[0-9a-zA-Z.-_]+@[0-9a-zA-Z-]+\.[a-zA-Z0-9.]+/im;
    if(emailChk.test(email)) {
      setEmailVal(true);
    } else {
      setEmailVal(false);
    }
  }
  
  const [wrongInfo, setWrongInfo] = useState(true)

  // 인풋값 추출
  const signInHandler = (e, name) => {
    const value = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      [name]: value
    })
    // console.log(userInfo)
  }

  // 유효성 검사 후 오류 메시지 초기화 
  const del = () => {
    // setMail(emailVal.test(email))
    setWrongInfo(true)
  }

  // 로그인 버튼 클릭과 동시에 유효성 검사 & 로그인 요청
  const onSubmit = async () => {
    if( (email === '' && password === '') | (email === '' | password === '')) {
      setWrongInfo(false)
      return
    } 
    try {
      const { data } = await axios.post(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/users/signin`, userInfo, { headers: {'Content-Type': 'application/json'}, withCredentials: true });
      if(data) {
        dispatch(reqSignIn(userInfo))
        navigation.navigate('TutorialHome')
      }

    } catch(err) {
      console.log(err.name, 'errrrrrr')
      if(err.name) {
        Alert.alert('이메일 혹은 비밀번호를 확인해 주세요.')
      }
    }

    // console.log(user.signIn, '-b-v--ae-asd---asd-asd--')
    // if(user.signIn.error) {
    //   Alert.alert('이메일과 비밀번호를 확인해 주세요')
    //   return 
    // }
    
    // setTimeout(() => {
    //   navigation.navigate('TutorialHome')
    // }, 1000)
  }

  // 구글 로그인 
  const googleOauth = () => {
    dispatch(googleSignIn())  
  }
  
  // Modal Handler
  const modalHandler = () => {
    setModal(modal => !modal);
  }
  
  return (
    <Container style={{width: SCREEN_WIDTH}} source={require('../../img/background.jpeg')}>
        {
          user.signIn.loading ? <Loading color='black' size='large'/> 
          : (
            <LoginForm> 
                <Header>LOGIN</Header>
                <SubHead>TO CONTINUE</SubHead>
              <Input 
                placeholder="EMAIL" 
                value={email}
                name='email'
                // keyboardType=''
                onChange={(e) => signInHandler(e, 'email')}
                onFocus={del}
                onBlur={emailValid}
              />
              { !emailVal ? <Text style={{color: 'red', marginTop: 10}}>이메일 형식이 유효하지 않습니다.</Text> : null }
              <Input 
              placeholder="PASSWORD"
              secureTextEntry
              name='password'
              onChange={(e) => signInHandler(e, 'password')}
              value={password}
              onFocus={del}
              />
              <MiddleContainer>
                <TouchableOpacity>
                  <MiddleText onPress={() => navigation.navigate('SignUp')}>계정이 없으신가요?</MiddleText>
                </TouchableOpacity>
                <TouchableOpacity onPress={modalHandler}>
                  <MiddleText>비밀번호를 잊으셨나요??</MiddleText>
                </TouchableOpacity>
              </MiddleContainer>
              <TouchableOpacity>
                  <MiddleText onPress={googleOauth}>GOOGLE로 로그인 하기</MiddleText>
                </TouchableOpacity>
              {
                !wrongInfo ? <Warn>이메일 혹은 비밀번호를 정확히 입력했는지 확인해 주세요</Warn> : null 
              }
              <Btn name='Log In' onPress={onSubmit}/>
              <ImageBackground source={require('../../img/girl.png')}/>
              {
                modal ? <PassModal modlal={modal} setModal={setModal}/>: null
              }
            </LoginForm>
          )
        }
      
    </Container>
  );
}

const Container = styled.ImageBackground`
  /* justify-content: center; */
  align-items: center;
  height: 100%; 
  /* width: 100%; */
  /* flex: 1; */
  background-color: #ddd;
`
const Header = styled.Text`
  font-size: 50px;
  font-weight: bold;
  margin: auto;
  margin-top: 100px;
  `
const SubHead = styled.Text`
  text-align: center;
  margin-bottom: 150px;
`
const Input = styled.TextInput`
  background-color: transparent;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-bottom-width: 2px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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




