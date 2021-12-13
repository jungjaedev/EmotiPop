import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Button, StyleSheet, TextInput, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
// import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
// import { useNavigate } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

function BeansContent({ navigation, route }) {
  // axios.get('http://localhost:80/beans', {
  //   data: {
  //     beans: data.beansInfo,
  //   },
  //   withCredentials: true,
  // });
  // console.log(route.params.data);

  const [datas, setDatas] = useState({});

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
    // console.log('BACK!!!');
    navigation.goBack();
  };

  // Todo : 게시글 수정 기능 구현
  const editContent = () => {
    console.log('edit!!');
  };

  console.log(datas);
  return (
    <Container>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, height: 0, marginHorizontal: 10 }}>
          <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35 }} onPress={goBack}>
            <Text>
              <Feather name="arrow-left-circle" size={35} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} style={{ width: 35, height: 35 }} onPress={editContent}>
            <Text>
              <Feather name="edit" size={35} color="black" />
            </Text>
          </TouchableOpacity>
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
                <View style={{ alignItems: 'center' }}>
                  <Text>{datas.emotions}</Text>
                  <Date>{datas.createdAt.slice(0, 10)}</Date>
                  <Time>{datas.createdAt.slice(11, 16)}</Time>
                </View>
              ) : null}
            </Header>
            <View style={{ borderBottomWidth: 3, borderBottomColor: '#a9caf5', borderRadius: 20, marginVertical: 15 }}></View>
            <Emotions>{/* <Text>Level : {datas.emotion_level}</Text> */}</Emotions>
            <Content>
              <Text style={{ paddingHorizontal: 20 }}>{datas.contents}</Text>
            </Content>
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
  align-items: center;
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
