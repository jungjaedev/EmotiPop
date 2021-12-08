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