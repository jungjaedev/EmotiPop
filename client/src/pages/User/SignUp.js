import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Btn from '../User/Button';
import { URL } from '../../modules/user';
import axios from 'axios';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SignUp({ navigation }) {
  const inputRef = useRef();
  const passRef = useRef();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    rePassword: '',
    username: '',
    notSame: false,
  });
  const { email, password, rePassword, username, notSame } = userInfo;
  const [form, setForm] = useState(true);
  const [pass, setPass] = useState(true);

  const emailVal =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

  // Form 추출
  const signUpHandler = (e, name) => {
    const value = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // email 값 추출
  const emailInput = e => {
    const email = e.nativeEvent.text;
    console.log(e.isPropagationStopped());
    setUserInfo({
      ...userInfo,
      email,
    });
    // console.log(userInfo)
  };
  // email vaildation
  const chkEmail = () => {
    console.log(emailVal.test(userInfo.email));
  };

  // pass값 추출
  const passInput = e => {
    const password = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      password,
    });
    // console.log(userInfo)
  };
  // repass값 추출
  const rePassInput = e => {
    const rePassword = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      rePassword,
    });
    if (password === rePassword) {
      setUserInfo({
        ...userInfo,
        rePassword,
        notSame: false,
      });
    }
    // console.log(userInfo)
  };
  // pass 6자 이상
  const firstPassChk = () => {
    if (password && password.length < 6) {
      console.log('hi?');
      setPass(false);
      passRef.current.focus();
    } else if (password.length >= 6) {
      setPass(true);
    }
  };

  // pass & repass 일치 여부 체크
  const passChk = () => {
    if (password !== rePassword) {
      console.log('hi?');
      setUserInfo({ ...userInfo, notSame: true });
      inputRef.current.focus();
    }
    return;
  };
  const nameInput = e => {
    const username = e.nativeEvent.text;
    setUserInfo({
      ...userInfo,
      username,
    });
    // console.log(userInfo)
  };
  // console.log(userInfo)
  const onSubmit = async () => {
    if ((email === '') | (password === '') | (username === '')) {
      setForm(false);
      return;
    }
    console.log('Clicked');
    try {
      const req = await axios.post(
        `${URL}users/signup`,
        { email, password, username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (!req.data.message === 'Signup Completed') {
        Alert.alert('Email or password is not correct!');
        throw new Error('Something went wrong');
      } else if (req.data.message === 'Signup Completed' && req.data.userinfo) {
        //!  로그인 페이지로 라우팅
        navigation.navigate('SignIn');
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Container style={{ width: SCREEN_WIDTH }} source={require('../../img/background.jpeg')}>
      <SignUpForm>
        <Header>SIGN UP</Header>
        <Input
          placeholder="EMAIL"
          value={email}
          // keyboardType='email-adress'
          onChange={e => signUpHandler(e, 'email')}
          onSelectionChange={chkEmail}
        />
        <Input
          placeholder="TYPE YOUR PASSWORD"
          secureTextEntry
          onChange={e => signUpHandler(e, 'password')}
          onEndEditing={() => firstPassChk}
          value={password}
          ref={passRef}
        />
        {!pass ? <Text>비밀번호는 6자 이상입니다</Text> : null}
        <Input
          placeholder="RETYPE YOUR PASSWORD"
          secureTextEntry
          onChange={e => rePassInput(e, 'password')}
          value={rePassword}
          ref={inputRef}
        />
        {notSame ? <NotSame>비밀번호가 일치하지 않습니다.</NotSame> : null}
        <Input
          placeholder="USERNAME"
          onFocus={passChk}
          onChange={nameInput}
          value={username}
          // keyboardType='phone-pad'
        />
        {!form ? <Warn>모든 입력은 필수 입니다.</Warn> : null}
        <Btn name="가입하기" color="violet" onPress={onSubmit} />
        <Btn name="Go Back" onPress={() => navigation.goBack()} />
      </SignUpForm>
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
`;
const Header = styled.Text`
  font-size: 50px;
  font-weight: bold;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
`;
const Input = styled.TextInput`
  background-color: transparent;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  font-size: 18px;
  padding-left: 10px;
  margin-top: 10px;
  border-bottom-width: 2px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  /* box-sizing: border-box; */
  /* border: none; */
`;
const SignUpForm = styled.View`
  width: 70%;
  /* background-color: #eee; */
`;
const MiddleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const MiddleText = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: black;
`;
const NotSame = styled.Text`
  color: red;
`;
const Warn = styled.Text`
  color: red;
  margin-top: 10px;
`;
/* const Btn = styled.Button`
  margin-top: 5px;
` */
