import React from 'react'
import { Button, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


const kakaoLogin = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <WebView
          originWhitelist={['*']}
          scalesPageToFit={false}
          style={{ marginTop: 30 }}
          source = {{uri : 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b27c48602757f7d466a976b2450b895e&redirect_uri=http://localhost:19006'}}
      />
    </View>
  )
}

export default kakaoLogin;