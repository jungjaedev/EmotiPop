import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import store from './modules/store';
import Main from './CalendarContainer/Main';
import { Provider } from 'react-redux';
import Theme from './styles/Theme'
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

function calendarContainer () {
  

  return (
    <View>
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Main />
        </ThemeProvider>
      </Provider>
    </View>
  )
}

export default calendarContainer;
// import React, { useEffect } from 'react';
// import { 
//     Button, 
//     View, 
//     Text,
//     TouchableOpacity,
//     Dimensions,
//   } from 'react-native';
// import * as Update from "expo-updates";
// import styled from 'styled-components/native';


// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// export default function CalenderContainer({navigation}) {

//   return (
//     <View style={{ 
//       alignItems: 'center', 
//       justifyContent: 'space-between',
//       width: SCREEN_WIDTH,
//       height: SCREEN_HEIGHT - 60
//     }}>
//       <Text style={{flex: 1}}>Calender</Text>
//     </View>
//   );
// }
