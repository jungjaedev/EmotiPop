import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
// import { Link } from "react-router-dom";
import Styled from 'styled-components/native';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
// import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function UserContainer (userInfo) {
  // const navigate = useNavigate();
  // const dispatch = useDispatch()

  function signOutHandler() {
    // dispatch(signOutUser())
    // navigate('/')
  }

  const token = useSelector(state => state.user.accessToken)
  
  const [ editForm, setEditForm ] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
  })

  function changeDetector(e) {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    })
  }

  function submitForm(e) {
    e.preventDefault()
    // axios.patch('http://localhost:80/mypage/me', {
    //   email, username, password
    // }, { headers: {
    //   'ContentType': 'application/json',
    //   authorization: `Bearer ${token}`
    // }, 'withCredentials': true
    // }).then(data => {
    //   console.log(data)
    //   if(data.status === 200) {
    //     navigate('/usercontainer')
    //   }
    // })

    // console.log(editForm)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {userInfo.username}
        </Text>
        <Text>
          {userInfo.email}
        </Text>
        <Button onClick={signOutHandler}>
          로그아웃
        </Button>
      </View>
      <View>
        <Button onPress={e => submitForm(e)}>
          수정
        </Button>
      </View>
      <View>
        <View>
          <TextInputs type="name" 
                name='username' 
                placeholder='username'
                required
                onChange={(e) => {changeDetector(e)}}></TextInputs>
          <TextInputs type="email" 
                name='email' 
                placeholder='email'
                required
                onChange={(e) => {changeDetector(e)}}></TextInputs>
          <TextInputs type="password" 
                name='password' 
                placeholder='password'
                required
                onChange={(e) => {changeDetector(e)}}></TextInputs>
          <TextInputs type="password" 
                name='repassword' 
                placeholder='repassword'
                required
                onChange={(e) => {changeDetector(e)}}></TextInputs>
        </View>
      </View>
      {/* <Link to='/resign'>
        <Button>
          회원탈퇴
        </Button>
      </Link> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#DBF4F4'
    }
})

const TextInputs = Styled.TextInput`
  display: inline-block;
  width: 40vw;
  height: 25px;
  outline: none;
  margin: 1rem 0 1rem 0;
  border: 1px solid #eee;
  border-radius: 3px;
  transition: .2s;
  &:hover {
    border: 1px solid dodgerblue;
    box-shadow: 0 0 5px dodgerblue;
  }
  &:focus::placeholder {
    visibility: hidden;
  }
`

export default UserContainer;