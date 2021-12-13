import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import { AppLoading } from 'expo';
import styled from 'styled-components/native';
// import * as Font from 'expo-font';


// export const Fonts = () => { 
//   Font.loadAsync({ 
//     UhBeeJJIBBABBA: require('../../../assets/fonts/UhBeeJJIBBABBA.ttf'),
//     UhBeeJJIBBABBABold: require('../../../assets/fonts/UhBeeJJIBBABBABold.ttf') 
//   })  
// };


// Font.loadAsync({
//   UhBeeJJIBBABBA: require('../../../assets/fonts/UhBeeJJIBBABBA.ttf'),
//   UhBeeJJIBBABBABold: require('../../../assets/fonts/UhBeeJJIBBABBABold.ttf'),
// });
// export const Fonts = {
//   UhBeeJJIBBABBA: require('../../../assets/fonts/UhBeeJJIBBABBA.ttf')
// }


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')


export default function Nodata() {
  // const [isReady, setIsReady] = useState(false);

  // const reqFont = async() => {
  //   return await Font.loadAsync({
  //     "UhBeeJJIBBABBA": require('../../../assets/fonts/UhBeeJJIBBABBA.ttf'),
  //     "UhBeeJJIBBABBABold": require('../../../assets/fonts/UhBeeJJIBBABBABold.ttf'),
  //   });
  // }

  // useEffect(() => {
  //     reqFont()
  //     setIsReady(true);
  //   }, []);
  const [text, setText] = useState(false)
  useEffect(() => {

    sleep()
  }, [])
  const sleep = () => {
    setTimeout(() => {
      setText(true);
    }, 500)
    return clearTimeout(sleep)
  }
  return (
    <Container>
      {/* {
        isReady && (
          <View style={{alignItems: 'center'}}>
            <FontBold style={{fontSize: 30}}>앗....!?!? 데이터가 없습니다</FontBold>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <FontNormal style={{fontSize: 16}}>메인페이지에서 글을 작성해 보시겠어요??</FontNormal>
          </View>
        ) 
      } */}
      { text 
        ? <Text style={{fontWeight: 'bold', fontSize: 30}}>앗....!?!? 데이터가 없습니다</Text>
        : null
      }
      
    </Container>
  )
}

const Container = styled.View`
  flex: 9;
  justify-content: center;
  align-items: center;
`
// const FontBold = styled.Text`
//   font-family: 'UhBeeJJIBBABBABold';
// `
// const FontNormal = styled.Text`
//   font-family: 'UhBeeJJIBBABBA';
// `