import React from 'react';
import Styled from 'styled-components/native';
// import { Link } from 'react-router-dom';
import Btn from '../User/Button'
import { View, Text, StyleSheet, Button } from 'react-native';

function ChooseRoom ({ navigation }) {
  

  return (
    <Container >
      <Blue>
        {/* <Link to='/Positive'/> */}
        <Btn 
          name ='Positive'
          onPress={() => navigation.navigate('ListOfMyPositiveBeans')}
        />
      </Blue>
      <Red>
        {/* <Link to='/Negative'/> */}
        <Btn name ='Negagive'/>
      </Red>
    </Container>
  )
}

const Container = Styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`

const Blue = Styled.View`
  width: 50px;
  height: 50px;
  /* border: 1px solid; */
  /* position: absolute;
  top: 0;
  left: 0;
  background-color: blue;
  transform-style: preserve-3d;
  transform-origin: right;
  transition: all 2s; */
`
const Red = Styled.View`
  width: 50px;
  height: 50px;
  /* border: 1px solid; */
  /* position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  transform-style: preserve-3d;
  transform-origin: right;
  transition: all 2s; */
`

export default ChooseRoom