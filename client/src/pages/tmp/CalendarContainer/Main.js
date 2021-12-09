import React from "react";
import { View } from "react-native";
import Body from './Body';
import Head from './Head';

const Main = ({ year, month }) => {

  return (
    <View>
      <Head year={year} month={month}/>
      <Body />
    </View>
  )
}

export default Main;