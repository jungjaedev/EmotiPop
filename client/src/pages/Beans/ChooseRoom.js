import React from 'react';
import Styled from 'styled-components/native';
import { Link, NativeRouter } from 'react-router-native';
import { View, Text, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';

function ChooseRoom() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <TouchableOpacity style={door.container1}>
          <Link to='/listofmypositivebeans'><Text>긍정이 방</Text></Link>
        </TouchableOpacity>
        <TouchableOpacity style={door.container2}>
          <Link to='/listofmynegativebeans'><Text>부정이 방</Text></Link>
        </TouchableOpacity>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBF4F4',
  },
});

const door = StyleSheet.create({
  container1: {
    margin: 50,
    width: 350,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C8BA6'
  },
  container2: {
    margin: 50,
    width: 350,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC638D'
  }
})

export default ChooseRoom;