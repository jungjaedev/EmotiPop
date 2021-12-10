import React, { useEffect } from 'react';
import { 
    Button, 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Update from "expo-updates";
import {reqSignOut, reSignIn} from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function MyPage({navigation}) {
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    // console.log('ads')
    const token = await AsyncStorage.getItem('AccessToken')
    dispatch(reqSignOut(token))
    // AsyncStorage.clear()
    // const res = await AsyncStorage.getAllKeys()
    // location.reload()
    Update.reloadAsync()
    // console.log(res)
  }
  
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
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 60
    }}>
      <Text style={{flex: 1}}>MyPage</Text>
      <TouchableOpacity style={{flex: 4}} onPress={logOutHandler}>
        <Text>SignOut</Text>
      </TouchableOpacity>
      {/* <Nav /> */}
    </View>
  );
}






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

