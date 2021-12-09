import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet, Image, View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Button, Modal, FormControl, NativeBaseProvider } from 'native-base';
import { SSRProvider } from '@react-aria/ssr';

export default function ShowContentModal({ data }) {
  const [isClose, setIsClose] = useState(true);
  const emotionpro = ['기쁨', '행복', '만족', '뿌듯', '설렘'];
  const emotionneg = ['슬픔', '우울', '걱정', '분노', '실망'];
  const texts = [
    '수고했어 오늘도, 아무도 너의 슬픔에 관심없대도 난 늘 응원해. 수고했어.수고했어',
    '이미 충분히 노력하고 있으니까 힘내라고 말할 수는 없어. 그렇지만, 매일매일 응원하고 있을게',
    '당신의 맑은 미소가 행복을 주는 오늘입니다',
  ];
  const random = Math.floor(Math.random() * texts.length);

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
              <FormControl.Label style={{ padding: 20 }}>
                <Text>{texts[random]}</Text>
              </FormControl.Label>
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
