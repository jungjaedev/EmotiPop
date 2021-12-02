import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from "react-router-dom";
import Styled from 'styled-component';

function Negative () {
  return (
    <View style={styles.container}>
      <Text>
        Beans List
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

export default Negative;