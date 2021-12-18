import React from 'react';

import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// Todo : 인트로 GIF setTimeout -> 다음페이지

export default function TutorialPage1() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{ width: SCREEN_WIDTH }}>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <InnerBackground source={require('../../img/intro.gif')} resizemode="contain"></InnerBackground>
      </ImageBackgrounds>
    </Page>
  );
}

const ImageBackgrounds = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  opacity: 0.8;
`;

const InnerBackground = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const Page = styled.View`
  /* margin-top: 20px; */
  width: 100%;
  height: 100%;
  background: #ddd;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 50px;
`;
