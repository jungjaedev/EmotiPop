import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Btn from '../User/Button'
import { useSelector } from 'react-redux';


export default function EmotiHome({ navigation }) {
  const user = useSelector(state => state.user.signIn)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome EmotiLand!!</Text>
      {
        !user.isLogin ?  (
          <Btn
            name='SignIn'
            title="SignIn"
            onPress={() => navigation.navigate('SignIn')}
          />
        )
        : null
      }
      <Btn
        name='SignIn'
        title="SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Btn
        name='SignUp'
        title="SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}