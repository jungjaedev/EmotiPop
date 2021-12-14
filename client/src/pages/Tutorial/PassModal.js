import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native'
import URL from '../../modules/user'
import axios from 'axios';
import { Center } from "native-base";

const PassModal = ({modal, setModal}) => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  // get email text state
  const [emailForm, setEmailForm] = useState('')
  console.log(emailForm)
  // email vaild check
  const [valid, setValid] = useState(true);

  const emailValid = () => {
    const emailChk = /[0-9a-zA-Z.-_]+@[0-9a-zA-Z-]+\.[a-zA-Z0-9.]+/im;
    if(emailChk.test(emailForm)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  const textHandler = (e) => {
    const value = e.nativeEvent.text;
    // console.log(value)
    setEmailForm(value)
  }

  const test = async() => {
    try{
      const res = await axios.post(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/users/findme`, {
      email: emailForm
    }, {
      headers: {
        'ContentType': 'applicaiton/json'
      },
      withCredentials: true
    })
      if(res.status === 200) {
        Alert.alert('임시 비밀번호가 메일로 전송되었습니다.')
      }
      setModal(modal => !modal)
    } catch(err) {
      console.log(err.name)
      if(err.name === 'Error') {
        Alert.alert('이메일 주소를 확인해 주세요!')
      }
    }
    
    // console.log(res)
    // if(res.status === 401) {
    //   Alert.alert('이메일이 존재하지 않습니다.')
    //   return
    // }
    
  }

  const alertPage = async() => {
    if(emailForm === '') {
      Alert.alert('이메일을 입력해 주세요')
      return
    }
    if(!valid) {
      return
    }

    test()
  }

  return (
    <View style={{
      width: screenWidth,
      height: screenHeight, 
      backgroundColor: '#ddd',
      opacity: 0.5,
      marginHorizontal: -60, 
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        style={{
        }}
      >
        <PopModal >
          <ModalContainer >
            <FontAwesome 
              name="close" 
              size={24} 
              color="black" 
              style={{alignSelf: 'flex-end'}}
              onPress={() => setModal(modal => !setModal)}
              />
              <Information>가입시 입력한 메일 주소를 입력해 주세요</Information>
              <InputContainer>
                <TextInput style={{
                  // backgroundColor: 'red',
                  width: '100%',
                  borderBottomWidth: 2,
                  fontSize: 15,
                  textAlign: 'center',
                }}
                value={emailForm}
                onChange={(e) => textHandler(e)}
                onBlur={emailValid}
                />
              </InputContainer>
              {
                !valid 
                  ? <Text style={{color: 'red', marginTop: 20}}>이메일 형식에 맞지 않습니다.</Text> 
                  : null
              }
              <Btn onPress={alertPage}>
                <Text>요청하기</Text>
              </Btn>
          </ModalContainer>
        </PopModal>
      </Modal>
    </View>
  );
};

const PopModal = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
  `
const ModalContainer = styled.View`
  margin: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  box-shadow: 0 10px 10px black;
  opacity: .8;
`
const Information = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`
const InputContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`

const Btn = styled.Pressable`
  margin-top: 20px;
`
export default PassModal;
