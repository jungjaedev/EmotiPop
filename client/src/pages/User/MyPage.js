// import React, { useEffect } from 'react';
// import { 
//     Button, 
//     View, 
//     Text,
//     TouchableOpacity,
//     Dimensions,
//   } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import * as Update from "expo-updates";
// import {reqSignOut, reSignIn} from '../../modules/user';
// import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components/native';
// import Nav from '../Home/Nav'


// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// export default function MyPage({navigation}) {
//   const dispatch = useDispatch();

//   const logOutHandler = async () => {
//     // console.log('ads')
//     const token = await AsyncStorage.getItem('AccessToken')
//     dispatch(reqSignOut(token))
//     // AsyncStorage.clear()
//     // const res = await AsyncStorage.getAllKeys()
//     // location.reload()
//     Update.reloadAsync()
//     // console.log(res)
//   }
  
//   //! Token owner Test
//   // const logg = async() => {
//   //   try {
//   //     const token = await AsyncStorage.getItem('AccessToken')
//   //     dispatch(reSignIn(token))
//   //   } catch(err) {
//   //   throw new Error(err)
//   //   }
//   // }

//   return (
//     <View style={{ 
//       alignItems: 'center', 
//       justifyContent: 'space-between',
//       width: SCREEN_WIDTH,
//       height: SCREEN_HEIGHT - 60
//     }}>
//       <Text style={{flex: 1}}>MyPage</Text>
//       <TouchableOpacity style={{flex: 4}} onPress={logOutHandler}>
//         <Text>SignOut</Text>
//       </TouchableOpacity>
//       {/* <Nav /> */}
//     </View>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import { 
//     Button, 
//     View, 
//     Text,
//     TouchableOpacity,
//     Dimensions,
//   } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import * as Update from "expo-updates";
// import {reqSignOut, reSignIn} from '../../modules/user';
// import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components/native';
// import Nav from '../Home/Nav'
// import { TextInput } from 'react-native-gesture-handler';
// import axios from 'axios';


// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// export default function MyPage() {
//   const [editInfoForm, setEditInfoForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     repassword: ''
//   })
//   const {username, email, password, repassword} = editInfoForm;
//   const token = useSelector(state => state.user.accessToken);
//   function changeDetector(e) {
//     const { name, value } = e;
//     setEditInfoForm({
//       ...editInfoForm,
//       [name]: value
//     })
//   }
//   console.log(editInfoForm)
//   function submitForm(e) {
//     e.preventDefault()

//     axios.patch('http://localhost:80/mypage/me', {
//       username, email, password
//     }, { headers: {
//       'ContentType': 'application/json',
//       authorization: `Bearer ${token}`
//     }, 'withCredentials': true
//     }).then(data => {
//       console.log(data)
//     })
//     console.log(editInfoForm)
//   }


//   const logOutHandler = async () => {
//     // console.log('ads')
//     const token = await AsyncStorage.getItem('AccessToken')
//     dispatch(reqSignOut(token))
//     // AsyncStorage.clear()
//     // const res = await AsyncStorage.getAllKeys()
//     // location.reload()
//     // Update.reloadAsync()
//     // console.log(res)
//   }
  
//   //! Token owner Test
//   // const logg = async() => {
//   //   try {
//   //     const token = await AsyncStorage.getItem('AccessToken')
//   //     dispatch(reSignIn(token))
//   //   } catch(err) {
//   //   throw new Error(err)
//   //   }
//   // }

//   return (
//     <View style={{ 
//       alignItems: 'center', 
//       justifyContent: 'space-between',
//       width: SCREEN_WIDTH,
//       height: SCREEN_HEIGHT - 60
//     }}>
//       <Text style={{flex: 1}}>MyPage</Text>
//       <TouchableOpacity style={{flex: 4}} onPress={logOutHandler()}>
//         <Text>SignOut</Text>
//       </TouchableOpacity>
//       <UserInfomation>
//         <TextInput onPress={changeDetector()}>이름 : {username}</TextInput>
//         <TextInput>이메일 : {email}</TextInput>
//         <TextInput>비밀번호 : {password}</TextInput>
//         <TextInput>비밀번호 확인 : {repassword}</TextInput>
//         <TouchableOpacity onPress={() => submitForm()} />
//       </UserInfomation>
//       <Nav />
//     </View>
//   );
// }

// const UserInfomation = styled.View`
//   flex: auto;
//   background-color: ivory;
//   height: 200px;
//   width: 200px;
// `







import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Update from 'expo-updates';
import { reqSignOut, reSignIn } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav';
import { TextInput } from 'react-native-gesture-handler';
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
  // function changeDetector(e, name) {
  //   const value = e.nativeEvent.text;
  //   setEditInfoForm({
  //     ...editInfoForm,
  //     [name]: value,
  //   });
  // }

  // const submitForm = async e => {
  //   // async function submitForm(e) {
  //   // console.log('-----------------', editInfoForm);
  //   const token = await AsyncStorage.getItem('AccessToken');
  //   // console.log(111111, token);
  //   // e.preventDefault();
  //   // console.log('-----------------', 'username :', username, email, password);
  //   await axios
  //     .patch(
  //       'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
  //       {
  //         username,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           ContentType: 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       }
  //     )
  //     .then(data => {
  //       console.log(111111111155555555, data.data);
  //     });
  //   // console.log(editInfoForm);
  // };

  const dispatch = useDispatch();

  const getToken = async() => {
    const token = await AsyncStorage.getItem('AccessToken');
    dispatch(reqSignOut(token));
    Update.reloadAsync()
  }

  const logOutHandler = () => {
    // console.log('ads')
    // AsyncStorage.clear()
    // const res = await AsyncStorage.getAllKeys()
    // location.reload()
    // console.log(res)
    getToken()
  };

  //! Token owner Test
  // const logg = async() => {
  //   try {
  //     const token = await AsyncStorage.getItem('AccessToken')
  //     dispatch(reSignIn(token))
  //   } catch(err) {
  //   throw new Error(err)
  //   }
  // }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 60,
      }}
    >
      <Text style={{ flex: 1 }}>MyPage</Text>
      <TouchableOpacity style={{ flex: 1 }} onPress={logOutHandler}>
        <Text>SignOut</Text>
      </TouchableOpacity>
      {/* <UserInfomation style={{ flex: 8, flexDirection: 'column', justifyContent: 'space-around' }}>
        <Text>이름</Text>
        <TextInput style={{ width: '90%', backgroundColor: 'white' }} onChange={e => changeDetector(e, 'username')} />
        <Text>이메일</Text>
        <TextInput style={{ width: '90%', backgroundColor: 'white' }} onChange={e => changeDetector(e, 'email')} />
        <Text>비밀번호</Text>
        <TextInput style={{ width: '90%', backgroundColor: 'white' }} onChange={e => changeDetector(e, 'password')} />
        <Text>비밀번호 확인</Text>
        <TextInput style={{ width: '90%', backgroundColor: 'white' }} onChange={e => changeDetector(e, 'repassword')} />
        {password && repassword && password !== repassword ? <Text> '비밀번호가 일치하지 않습니다'</Text> : null}
        <Button title="Edit" onPress={() => console.log('hi')} />
      </UserInfomation>
      <Button style={{ flex: 1 }} title="회원탈퇴" onPress={() => navigation.navigate('Resign')} /> */}
    </View>
  );
}

const UserInfomation = styled.View`
  flex: auto;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  background-color: violet;
  align-items: center;
  height: 150px;
  width: 300px;
`;
