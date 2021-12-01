import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from "react-router-dom";
import Styled from 'styled-component';

function Mypage () {
  
  return (
    <View style={styles.container}>
      <Text>
        Mypage
      </Text>
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

export default Mypage;