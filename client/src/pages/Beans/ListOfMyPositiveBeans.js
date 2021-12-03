import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from "react-router-dom";
import axios from 'axios';

function ListOfMyPositiveBeans () {
  const [beansInfo, setBeansInfo] = useState({
    created_at: '',
    emotions: '',
    emotion_level: ''
  })
  const { emotions, emotion_level, created_at } = beansInfo;

  const changeCreatedAt = (e) => {
    const created_at = e.nativeEvent.text;
    setBeansInfo({
      ...beansInfo,
      created_at
    })
  }
  const changeEmotions = (e) => {
    const emotions = e.nativeEvent.text;
    setBeansInfo({
      ...beansInfo,
      emotions
    })
  }
  const changeEmotionLevel = (e) => {
    const emotion_level = e.nativeEvent.text;
    setBeansInfo({
      ...beansInfo,
      emotion_level
    })
  }

  return (
    <View style={styles.container}>
      <Text>
        {beansInfo}
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

export default ListOfMyPositiveBeans;