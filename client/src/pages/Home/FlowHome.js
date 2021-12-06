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
import TutorialPage1 from './TutorialPage1';
import TutorialPage2 from './TutorialPage2';
import TutorialPage3 from './TutorialPage3';
import TutorialPage4 from './TutorialPage4';



export default function FlowHome() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Container width={SCREEN_WIDTH}>
      <Scroll pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
        <TutorialPage1/>
        <TutorialPage2/>
        <TutorialPage3/>
        <TutorialPage4/>
      </Scroll>
    </Container>
  )
}

const Container = styled.SafeAreaView`
  background: #eee;
  height: 100%;
`
const Scroll = styled.ScrollView`
  /* flex-direction: row; */
`
