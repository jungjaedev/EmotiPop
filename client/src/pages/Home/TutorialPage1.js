import React from 'react';

import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native'
import styled from 'styled-components/native';


export default function TutorialPage1() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{width: SCREEN_WIDTH}}>
      <Title>Tutorial Page 1</Title>
    </Page>
  )
}

const Page = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 100%; 
  background: #ddd;
  justify-content: center;
  align-items: center;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 50px;
`