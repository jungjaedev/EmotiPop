import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, DynamicColorIOS, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import BeansContent from './BeansContent';

const { width: screenWidth } = Dimensions.get('window');
function ListOfMyPositiveBeans({ navigation, route, data, setRoom, setBeansData }) {
  // const stateStore = useSelector(state => state.user);
  // const { user, accessToken } = stateStore;
  // const [list, setList] = useState([]);

  const [detail, setDetail] = useState(0);
  const [bean, setBean] = useState();
  // Todo: 카드 누르면 상세보기 페이지로 이동
  // const showDetail = beanId => {
  //   console.log('DETAIL');
  //   console.log('beanId : ', beanId);

  // navigation.navigate('BeansContent',{data: route.params.data})
  // };

  const goBack = () => {
    // console.log('BACK!!!');
    // navigation.goBack();
    setRoom(0);
  };

  return (
    <View style={{ flex: 1, width: screenWidth }}>
      {detail === 0 ? (
        <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ position: 'absolute', top: 0, left: 15, width: 35, height: 35 }}
            onPress={goBack}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          >
            <Text>
              <Feather name="arrow-left" size={35} color="black" />
            </Text>
          </TouchableOpacity>
          <Header style={{ borderBottomWidth: 3, borderBottomColor: '#a9caf5', borderRadius: 20 }}>
            <View style={{ width: 200, marginTop: 25 }}>
              <Roomname>긍정이방</Roomname>
            </View>
            <View style={{ width: 130, marginTop: 35 }}>{!data[0] ? null : <Date>{data[0].createdAt.toString().split('T')[0]}</Date>}</View>
          </Header>
          <ScrollView>
            {data.map((bean, idx) => {
              return (
                <Card
                  key={bean.id}
                  onPress={() => {
                    // console.log(bean.id);
                    // navigation.navigate('BeansContent', { data: bean.id });
                    setDetail(1);
                    setBean(bean.id);
                  }}
                >
                  <Beans source={require('../../img/blueBean.png')} />
                  <View style={{ paddingLeft: 8, flexDirection: 'row', width: 40, marginHorizontal: 20, paddingTop: 10 }}>
                    <Emotion>{bean.emotions}</Emotion>
                  </View>
                  <View style={{ marginLeft: 10, width: '70%', marginTop: 2 }}>
                    <Level>LEVEL : {bean.emotion_level}</Level>
                    <View style={{ marginTop: 5, width: `88%`, height: 10, backgroundColor: 'lightgrey', borderRadius: 3 }}>
                      <View
                        style={{
                          marginTop: 5,
                          width: `${bean.emotion_level}0%`,
                          height: 10,
                          backgroundColor: '#f28d88',
                          borderRadius: 3,
                          bottom: 5,
                        }}
                      ></View>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'center', padding: 5, marginRight: 15, marginBottom: 2 }}>
                    <Time>{bean.createdAt.toString().split('T')[1].split('.')[0].slice(0, 5)}</Time>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </ImageBackgrounds>
      ) : (
        <BeansContent setDetail={setDetail} bean={bean} setBeansData={setBeansData} data={data} />
      )}
    </View>
  );
}

const Emotion = styled.Text`
  color: #033f8c;
  font-weight: bold;
  font-size: 15px;
`;

const Level = styled.Text`
  color: black;
  font-size: 13px;
`;

const Time = styled.Text`
  color: black;
  font-size: 11px;
  padding-top: 15px;
`;

const Card = styled.TouchableOpacity`
  flex-direction: row;
  /* border: 1px solid black; */
  background-color: white;
  justify-content: space-around;
  margin: 10px 25px 10px 25px;
  border-radius: 13px;
  padding: 5px;
`;

const Roomname = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

const Date = styled.Text`
  margin-left: 15px;
  font-size: 19px;
  font-weight: bold;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
  margin-bottom: 10px;
  height: 90px;
  /* border: 1px solid black; */
`;

const Beans = styled.ImageBackground`
  /* flex: 1; */
  height: 30px;
  width: 30px;
  top: 5px;
  margin-left: 10px;

  opacity: 0.9;
`;

const ImageBackgrounds = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  opacity: 1;
`;

export default ListOfMyPositiveBeans;
