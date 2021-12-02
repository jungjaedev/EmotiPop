import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Link } from "react-router-dom";
import Styled from 'styled-component';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function BeansContainer(data) {
  axios.get('',
  {data: {
    beans : data.beansInfo
  }, withCredentials : true})

  return (
    <View style={styles.container}>
      <Text>{beans}</Text>
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

export default BeansContainer;