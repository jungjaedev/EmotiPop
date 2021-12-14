import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Button, StyleSheet, TextInput, ImageBackground, Alert } from 'react-native';
import styled from 'styled-components/native';
// import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
// import { useNavigate } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

function BeansContent({ navigation, route }) {
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(datas.contents);

  const getData = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const data = await axios.get(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/beans/${route.params.data}`, {
      headers: {
        ContentType: 'application/json',
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setDatas(data.data.data);
    // console.log('------data: ', data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const editContent = () => {
    console.log('edit!!');
    setEdit(!edit);
  };

  const editContentaxios = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    // console.log('editContentaxios!!');
    const data = await axios.patch(
      `http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/beans/${datas.id}`,
      {
        contents: value,
        emotions: datas.emotions,
        emotion_level: datas.emotion_level,
        gourdkinds: datas.gourdkinds,
      },
      {
        headers: {
          ContentType: 'application/json',
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setDatas(data.data.data);
    // console.log('------data: ', data.data.data);
    setEdit(!edit);
  };

  const onChangeText = text => {
    // console.log('edit');
    setValue(text);
  };

  const deleteContent = () => {
    const deleteaxios = async () => {
      // console.log('del');
      const token = await AsyncStorage.getItem('AccessToken');
      await axios.delete(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/beans/${datas.id}`, {
        headers: {
          ContentType: 'application/json',
          authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setValue('');
      setEdit(false);
      setDatas('');
      navigation.navigate('MainHome');
    };

    Alert.alert(
      '콩주머니 삭제',
      '삭제하시겠습니까?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: deleteaxios },
      ],
      { cancelable: false }
    );
  };

  // console.log('----', datas);
  return (
    <Container>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, height: 0, marginHorizontal: 10 }}>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35 }} onPress={goBack}>
              <Text>
                <Feather name="arrow-left" size={35} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {edit ? (
              <TouchableOpacity activeOpacity={0.2} style={{ width: 35, height: 35 }} onPress={editContentaxios}>
                <Text>완료</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.2} style={{ width: 35, height: 35 }} onPress={editContent}>
                <Text>수정</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35 }} onPress={deleteContent}>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        {datas !== {} ? (
          <View>
            <View style={{ alignItems: 'center', marginVertical: 25 }}>
              {datas.gourdKinds === true ? (
                <Beans source={require('../../img/blueBean.png')} />
              ) : (
                <Beans source={require('../../img/redBean.png')} />
              )}
            </View>
            <Header>
              {datas.hasOwnProperty('createdAt') ? (
                <View>
                  <Text>Emotion : {datas.emotions}</Text>
                  <Date>{datas.createdAt.slice(0, 10)}</Date>
                  <Time>{datas.createdAt.slice(11, 16)}</Time>
                </View>
              ) : null}
            </Header>
            <View style={{ borderBottomWidth: 3, borderBottomColor: '#a9caf5', borderRadius: 20, marginVertical: 15 }}></View>
            <Emotions></Emotions>

            {!edit ? (
              <Content style={{ paddingHorizontal: 20 }}>
                <Text onChangeText={onChangeText}>{datas.contents}</Text>
              </Content>
            ) : (
              <Content style={{ paddingHorizontal: 20 }}>
                <TextInput onChangeText={onChangeText}>{datas.contents}</TextInput>
              </Content>
            )}
          </View>
        ) : null}
      </ImageBackgrounds>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justifycontent: center;
  alignitems: center;
`;

const ImageBackgrounds = styled.ImageBackground`
  height: 100%;
  width: 100%;
  opacity: 1;
`;

const Beans = styled.ImageBackground`
  /* flex: 1; */
  height: 40px;
  width: 40px;
  top: 40px;
`;

const Header = styled.View`
  margin-top: 30px;
  margin-left: 20px;
  /* align-items: center; */
`;

const Emotions = styled.View`
  margin-top: 20;
  flex-direction: row;
`;

const Date = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Time = styled.Text`
  font-size: 13px;
`;

const Content = styled.View``;

export default BeansContent;
