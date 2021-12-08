import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';

function ListOfMyNegativeBeans () {
  const stateStore = useSelector(state => state.user)
  const { user, accessToken} = stateStore;
  const [ list, setList ] = useState([])

  useEffect(async() => {
    await axios.get('http://localhost:80/beans/:beans_id', {
        headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type':'application/json'
      }, withCredentials: true}
    ).then(beans => {
      setList(list.concat(beans.data))
    }),console.log(beans)
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

export default ListOfMyNegativeBeans;