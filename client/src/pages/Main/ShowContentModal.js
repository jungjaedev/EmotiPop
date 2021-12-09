import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Touchable,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
  CheckIcon,
  Select,
  Menu,
  Divider,
  HamburgerIcon,
} from 'native-base';
import { SSRProvider } from '@react-aria/ssr';
import Btn from '../User/Button';

export default function ShowContentModal({ data }) {
  const [isClose, setIsClose] = useState(true);
  const emotionpro = ['기쁨', '행복', '만족', '뿌듯', '설렘'];
  const emotionneg = ['슬픔', '우울', '걱정', '분노', '실망'];

  const goMain = () => {
    setIsClose(false);
    // TODO: 모달창꺼지고 메인페이지로 이동
  };

  return (
    <NativeBaseProvider>
      <Modal isOpen={isClose} onClose={goMain}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>콩주머니 내용</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>감정</FormControl.Label>
              {emotionpro.includes(data.emotions) ? (
                <Bean source={require('../../img/redNo.png')}>
                  <View style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Text>{data.emotions}</Text>
                  </View>
                </Bean>
              ) : (
                <Bean source={require('../../img/blueNo.png')}>
                  <View style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Text>{data.emotions}</Text>
                  </View>
                </Bean>
              )}
            </FormControl>
            <FormControl style={{ marginTop: 20 }}>
              <FormControl.Label>레벨</FormControl.Label>
              <Text style={{ fontSize: 18 }}>{data.emotion_level}</Text>
            </FormControl>
            <FormControl style={{ marginTop: 20 }}>
              <FormControl.Label>상황설명</FormControl.Label>
              <Content>{data.contents}</Content>
            </FormControl>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
}

const Content = styled.Text`
  font-size: 18px;
  border: 1px solid #dce3e8;
  border-radius: 5px;
  padding: 3px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
`;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#dce3e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },

  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});

const Bean = styled.ImageBackground`
  /* flex: 1; */
  height: 50px;
  width: 50px;
  opacity: 0.8;
`;

const ImageBackgrounds = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  opacity: 0.8;
`;

const MainView = styled.View`
  /* background-color: red; */
`;

const Grourds = styled.Image`
  margin-left: 40px;
  height: 400px;
  width: 100%;
`;

const Girl = styled.Image`
  margin-top: 20px;
  height: 30%;
  width: 30%;
`;
