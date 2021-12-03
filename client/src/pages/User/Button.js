import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';


export default function Button({name, onPress}) {
  return (
    <Btn onPress={onPress}>
      <BtnText >{name}</BtnText>
    </Btn>
  )
}

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: violet;
  margin-top: 20;
  padding-top: 10;
  padding-bottom: 10;
  border-radius: 5;
`
const BtnText = styled.Text`
  font-size: 15;
  font-weight: bold;
  color: #fff
`
/* const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 15,
  },
}); */
