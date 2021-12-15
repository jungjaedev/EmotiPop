import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet, Image, View, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
// import WriteBeans from './WriteBeans';
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
import axios from 'axios';
import NegThrow from './Components/NegThrow';
import PosThrow from './Components/PosThrow';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const { width: screenWidth } = Dimensions.get('window');

export default function Main({ navigation }) {
  const [writing, setWriting] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [emotion, setEmotion] = useState('');
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [gourdkinds, setGourdkinds] = useState(1);

  const emotionpro = ['기쁨', '행복', '만족', '뿌듯', '설렘'];
  const emotionneg = ['슬픔', '우울', '걱정', '분노', '실망'];
  const levelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  /**
  // 모달창에서 X누르면 꺼짐
  // 레벨선택 저장
  // 감정선택한것 저장.
  // 상황설명
  // 콩주머니 하나누르면 나머지 비활성화..
 */

  const deleteAll = () => {
    setEmotion('');
    setSelectedLevel('');
    setText('');
    setWriting(false);
  };
  const selectEmotion = emotion => {
    if (emotion === '') {
      return;
    }
    setEmotion(emotion);
    setDisabled(!disabled);
    if (emotionneg.includes(emotion)) {
      setGourdkinds(0);
    } else {
      setGourdkinds(1);
    }
  };

  const weeklyPop = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const weeklydata = await axios.get('http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/pop', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (weeklydata.data.message === 'Negative Gourd Win') {
      navigation.navigate('NegPop');
    } else if (weeklydata.data.message === 'Postive Gourd Win') {
      navigation.navigate('PosPop');
    } else {
      navigation.navigate('BothPop');
    }
  };

  const onChangeText = payload => {
    setText(payload);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    if (emotion === '' || selectedLevel === '' || text === '') {
      return Alert.alert('모든 입력은 필수입니다.');
    }
    const newData = await axios.post(
      'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/beans',
      { emotion_level: selectedLevel, emotions: emotion, contents: text, gourdkinds },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (newData.data.message === 'ok') {
      deleteAll();
      if (gourdkinds === 1) {
        navigation.navigate('PosThrow', { data: newData.data.data });
      } else {
        navigation.navigate('NegThrow', { data: newData.data.data });
      }
      console.log('Here!!');
    }
  };

  return (
    <SSRProvider>
      <MainView style={{ flex: 1 }}>
        <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
          <TouchableOpacity onPress={() => setWriting(true)}>
            <Grourds source={require('../../img/gourds.png')} resizemode="contain" style={{ resizeMode: 'contain', width: screenWidth }} />
            {/* 박을 누르면 콩주머니 작성 모달띄워줌*/}
            {writing ? (
              <NativeBaseProvider>
                <Modal isOpen={writing} onClose={deleteAll}>
                  <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>콩주머니 작성</Modal.Header>
                    <Modal.Body>
                      <FormControl>
                        <FormControl.Label>감정선택</FormControl.Label>
                        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          {emotionpro.map((em, index) => {
                            return (
                              <TouchableOpacity
                                // disabled={disabled}
                                // activeOpacity={disabled ? 0.3 : 1}
                                onPress={e => selectEmotion(em)}
                                key={index}
                              >
                                <Bean key={index} source={require('../../img/redNo.png')} resizemode="cover">
                                  <View style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                                    {
                                      /* {em */
                                      emotion === em ? (
                                        <Text value={emotion} style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>
                                          {em}
                                        </Text>
                                      ) : (
                                        <Text value={emotion} style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>
                                          {em}
                                        </Text>
                                      )
                                    }
                                  </View>
                                </Bean>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        <View
                          style={{ marginBottom: 10, marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                          {emotionneg.map((em, index) => {
                            return (
                              <TouchableOpacity onPress={e => selectEmotion(em)} key={index}>
                                <Bean source={require('../../img/blueNo.png')} resizemode="cover">
                                  <View style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                                    {
                                      /* {em */
                                      emotion === em ? (
                                        <Text value={emotion} style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>
                                          {em}
                                        </Text>
                                      ) : (
                                        <Text value={emotion} style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>
                                          {em}
                                        </Text>
                                      )
                                    }
                                  </View>
                                </Bean>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>레벨선택</FormControl.Label>
                        <Select
                          selectedValue={selectedLevel}
                          mx={{
                            base: 0,
                            md: 'auto',
                          }}
                          accessibilityLabel="eSelect Emotion Level"
                          placeholder="Select Emotion Level"
                          onValueChange={nextValue => setSelectedLevel(nextValue)}
                          _selectedItem={{
                            bg: 'cyan.600',
                            endIcon: <CheckIcon size={4} />,
                          }}
                        >
                          {levelList.map((level, index) => {
                            return <Select.Item label={`${level}`} value={`${level}`} key={index} />;
                          })}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>상황설명</FormControl.Label>
                        <View style={styles.textAreaContainer}>
                          <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="어떤 상황인가요?"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            value={text}
                            onChangeText={onChangeText}
                          />
                        </View>
                      </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                      <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Btn onPress={getToken}>
                          <BtnText>콩주머니 던지기</BtnText>
                        </Btn>
                      </View>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </NativeBaseProvider>
            ) : null}
          </TouchableOpacity>
          {new Date().getDay() === 3 ? (
            <Bubble style={{ margin: 20, padding: 20, position: 'absolute', left: 150, bottom: 180 }}>
              <Text style={{ marginTop: 'auto', marginBottom: 'auto', padding: 5 }}>지금 저를 누르면 박이 터져요!!!</Text>
            </Bubble>
          ) : null}
          {new Date().getDay() === 3 ? (
            <TouchableOpacity onPress={weeklyPop}>
              <Girl source={require('../../img/girl.png')} resizemode="contain" style={{ resizeMode: 'contain' }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Girl source={require('../../img/girl.png')} resizemode="contain" style={{ resizeMode: 'contain' }} />
            </TouchableOpacity>
          )}
        </ImageBackgrounds>
      </MainView>
    </SSRProvider>
  );
}

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

const Bubble = styled.View`
  font-size: 18px;
  line-height: 24px;
  width: 260px;
  background: #fff;
  border-radius: 40px;
  padding: 24px;
  text-align: center;
  color: #000;
`;

const Bean = styled.ImageBackground`
  /* flex: 1; */
  height: 40px;
  width: 40px;
  opacity: 0.8;
`;

const ImageBackgrounds = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  opacity: 1;
`;

const MainView = styled.View`
  /* background-color: red; */
`;

const Grourds = styled.Image`
  margin-left: 40px;
  height: 400px;
  /* width: 400px; */
`;

const Girl = styled.Image`
  margin-top: 30px;
  height: 50%;
  /* width: 30%; */
`;

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-top: 20px;

  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
`;
const BtnText = styled.Text`
  font-size: 13;
  font-weight: bold;
  color: black;
  padding-left: 15px;
  padding-right: 15px;
`;
