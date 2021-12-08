import React from 'react';


import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native'
import Btn from '../User/Button'
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';


export default function TutorialPage5() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{width: SCREEN_WIDTH}}>
      <Title>Tutorial Page 4</Title>
    </Page>
  )
}


const Page = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 100%; 
  background: #ddd;
  justify-content: center;
  align-items: center;
`
const Title = styled.Text`
  font-weight: bold;
  font-size: 50px;
`

const SquareBtn = styled.TouchableOpacity`
  margin-right: 10px;
  background: #eee;
  border-radius: 5px;
  padding: 10px;
`



// export default function TutorialPage4() {
//   const { width: SCREEN_WIDTH } = Dimensions.get('window');

//   return (
//     <NavigationContainer>
//       <EmotiStack></EmotiStack>
//       <Page style={{width: SCREEN_WIDTH}}>
//         <Title>Tutorial Page 4</Title>
//         <Text style={{fontSize: 20, marginVertical: 10, color: 'red'}}>Enjoy our Emotion World!</Text>
//         <View style={{flexDirection:'row'}}>
//           <SquareBtn onPress={() => navigation.navigate('SignIn')}>
//             <Text>
//               회원로그인
//             </Text>
//           </SquareBtn>
//           <SquareBtn>
//             <Text>
//               가입하기
//             </Text>
//           </SquareBtn>
//           <SquareBtn>
//             <Text>
//               구글 로그인
//             </Text>
//           </SquareBtn>
//         </View>
//       </Page>
//     </NavigationContainer>
//   )
// }