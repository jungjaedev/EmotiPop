import React from 'react';
import Styled from 'styled-components/native';
import { Link, NativeRouter } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Btn from '../User/Button';
import { View, Text, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';

function ChooseRoom({ navigation }) {

  return (
    <NativeRouter>
      <View style={styles.container}>
        <TouchableOpacity
        style={door.container1}
        name='ListOfMyPositiveBeans'
        title="ListOfMyPositiveBeans"
        onPress={() => navigation.navigate('ListOfMyPositiveBeans')}
        />
        <TouchableOpacity
        style={door.container2}
        name='ListOfMyNegativeBeans'
        title="ListOfMyNegativeBeans"
        onPress={() => navigation.navigate('ListOfMyNegativeBeans')}
        />
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