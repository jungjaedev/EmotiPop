import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Text, TextInput, StyleSheet, Image, View, ImageBackground, Button } from 'react-native';
import styled from 'styled-components/native';
import MessageModal from './MessageModal';

export default function PosPop({ navigation }) {
  const [time, setTime] = useState(false);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 4000);
  }, []);

  return (
    <Container>
      <ImageBackgrounds source={require('../../../img/background.jpeg')} resizemode="cover">
        <ImageBackgrounds source={require('../../../img/positivePop_4.gif')} resizemode="cover"></ImageBackgrounds>
        {time ? <MessageModal navigation={navigation} /> : null}
      </ImageBackgrounds>
    </Container>
  );
}

const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ImageBackgrounds = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;
