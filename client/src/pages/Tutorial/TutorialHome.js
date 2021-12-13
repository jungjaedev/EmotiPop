import React, { useEffect } from 'react';
import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TutorialPage1 from './TutorialPage1';
import TutorialPage2 from './TutorialPage2';
import TutorialPage3 from './TutorialPage3';
import TutorialPage4 from './TutorialPage4';
import TutorialPage5 from './TutorialPage5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './SignIn';
import { reSignIn } from '../../modules/user';

export default function TutorialHome({ navigation }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const dispatch = useDispatch();
  // const state = useSelector(state => state)
  // console.log(state, 'This is inSide stage')

  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
  };

  useEffect(() => {
    try {
      const token = getToken();
      // const token = await AsyncStorage.getItem('AccessToken')
      if (!token) {
        return;
      }
      dispatch(reSignIn(token));
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  return (
    <Container width={SCREEN_WIDTH}>
      <Scroll pagingEnabled horizontal showsHorizontalScrollIndicator={true}>
        <TutorialPage1 />
        <TutorialPage2 />
        <TutorialPage3 />
        <TutorialPage4 />
        <TutorialPage5 />
        <SignIn navigation={navigation} />
      </Scroll>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background: #eee;
  height: 100%;
`;
const Scroll = styled.ScrollView`
  /* flex-direction: row; */
`;
