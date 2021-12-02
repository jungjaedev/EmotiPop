import React from 'react';
import Styled from 'styled-component';
import { Link } from 'react-router-dom';
import { View, Text, StyleSheet, Button } from 'react-native';

function ChooseRoom () {
  

  return (
    <View style={styles.container}>
      <Blue>
        <Link to='/listofmypositivebeans'/>
      </Blue>
      <Red>
        <Link to='/listofmynegativebeans'/>
      </Red>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#DBF4F4'
  }
})

const Blue = Styled.View`
  width: 200px;
  height: 300px;
  border: 1px solid;
  position: absolute;
  top: 0;
  left: 0;
  background-color: blue;
  transform-style: preserve-3d;
  transform-origin: right;
  transition: all 2s;
`
const Red = Styled.View`
  width: 200px;
  height: 300px;
  border: 1px solid;
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  transform-style: preserve-3d;
  transform-origin: right;
  transition: all 2s;
`

export default ChooseRoom