import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Link } from "react-router-dom";
import Styled from 'styled-component';
import { signOutUser, signinUser, registUser, actionUser } from '../../modules/user';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function Resign (user) {
  function DeleteUser(e) {
    axios.delete('',
      {data: {
          email: user.email,
          username: user.username,
          password: user.password
      },
    withCredentials: true,}
    )
  }

  return (
    <View style={styles.container}>
      <Button onPress={e => DeleteUser(e)}>예</Button>
      <Link to='/usercontainer'>
        <Button>아니오</Button>
      </Link>
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

export default Resign;