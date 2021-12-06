import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import Styled from 'styled-components/native';

function Positive () {
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

export default Positive;