import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, DynamicColorIOS } from 'react-native';
import Styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ListOfMyPositiveBeans () {
  const stateStore = useSelector(state => state.user)
  const { user, accessToken} = stateStore;
  const [ list, setList ] = useState([]);

  useEffect(async() => {
    await axios.get('http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:80/beans/:29', {
        headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type':'application/json'
      }, withCredentials: true}
    ).then(beans => {
      setList(list.concat(beans.data.contents))
    })
    .catch(err => (console.log(err)))
  }, [])
  
  
  return (
    <View style={styles.container}>
      {
        list.map(beans => (
          <Link to={`/beanscontent/${beans.id}`} key={beans.id}>
            <Text style={{'backgroundImage':`url(${beans.contents})`}}></Text>
          </Link>
        ))
      }
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