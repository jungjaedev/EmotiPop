import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Text, TextInput, StyleSheet, Image, View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import ShowContentModal from '../ShowContentModal';

export default function NegThrow({navigation}) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const showModal = () => {
    return <ShowContentModal />;
  };

  return (
    <TouchableOpacity onPress={showModal}>
      <Container style={{ width: SCREEN_WIDTH }}>
        <ImageBackgrounds source={require('../../../img/throwtonegative.gif')} resizemode="cover"></ImageBackgrounds>
      </Container>
    </TouchableOpacity>
  );
}
const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ImageBackgrounds = styled.ImageBackground`
  /* flex: 1; */
  position: relative;
  margin-top: 100px;
  height: 300px;
  width: 120%;
  /* right: 20%; */
  /* margin-right: auto; */
  margin-left: -100px;
`;
