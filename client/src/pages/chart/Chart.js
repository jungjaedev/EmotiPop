import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from '../User/Button';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function Chart({ beans }) {
  // console.log(beans)

  return (
    <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
      {beans.map((item, idx) => (
        <Item key={idx}>
          <SubTitle>
            <Left>{Object.keys(item)}</Left>
            <Right>{Object.values(item)}%</Right>
          </SubTitle>
          <ProgressContainer>
            <ProgressBar style={{ width: `${Object.values(item)}%` }} />
            {/* <LinearGradient colors={['red', 'gold']} style={{width: `${Object.values(item)}%`}}/> */}
          </ProgressContainer>
        </Item>
      ))}
    </ScrollView>
  );
}

const Item = styled.View`
  width: 100%;
  align-items: center;
`;
const SubTitle = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Left = styled.Text`
  color: #fff;
`;
const Right = styled.Text`
  color: #fff;
`;
const ProgressContainer = styled.View`
  border: 1px solid #6cd4c4;
  border-radius: 3px;
  width: 80%;
  height: 30px;
  padding: 10px;
  margin-bottom: 15px;
`;
const ProgressBar = styled.View`
  height: 10px;
  /* width: 90%; */
  background: red;
  /* background: linear-gradient('to right', 'red', 'gold') */
`;

// const bar = new keyframe({
//   0: {

//   }
// })
