import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Plotly from 'react-native-plotly';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChartData } from '../../modules/chart';
import { reloadAsync } from 'expo-updates';
import Nodata from './Nodata';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ChartContainer() {
  const dispatch = useDispatch();
  const emotions = useSelector(state => state.chart.chart.data);

  // 페이지가 랜더링 될 때 마다 감정을 조회함
  // const token = getToken();
  // useEffect(() => {
  //   try {
  //     // console.log(token, 'flowflowflowflow1');
  //     dispatch(getChartData(token))
  //   } catch(err) {
  //     throw new Error(err)
  //   }
  // }, [])

  // const getToken = async () => {
  //   const token = await AsyncStorage.getItem('AccessToken');

  //   return token;
  // }
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    dispatch(getChartData(token));
  };

  // 조회 된 감정을 가공함. 배열 안의 객체에 밸류값을 추출해 평탄화
  const avr = emotions ? emotions.map(el => Object.values(el)).flat() : null;
  // console.log(avr, ' - - - - - - - - - - - -- - ')

  // chart data
  const data = [
    {
      type: 'scatterpolar', // chart type
      r: avr, // data
      theta: ['기쁨', '행복', '만족', '뿌듯', '설렘', '슬픔', '우울', '걱정', '분노', '실망', '기쁨'], // data category
      fill: 'toself', // fill option
      name: 'ToTal', // data group name
      opacity: 0.5,
    },
    // {
    //   type: 'scatterpolar', // chart type
    //   r: [15, 6, 12, 15, 20, 3, 10, 9, 13, 10, 15], // data
    //   theta: ['행복','슬픔','걱정', '화남', '우울', '설렘', '만족', '편안', '뿌듯', '신남', '행복'], // data category
    //   fill: 'toself', // fill option
    //   name: 'Week' // data group name
    // }
  ];

  // chart layout
  const layout = {
    // margin: {
    //   l: 0,
    //   r: 0,
    //   t: 0,
    //   d: 0,
    // },
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 50],
        color: 'red',
        ticklen: 0,
        // showticklabels: false,
      },
      angularaxis: {
        rotation: 18,
        color: 'black',
      },
      gridshape: 'linear',
    },
    title: '감정의 분포',
    // color: 'red',
    // showlegend: false,
    // displayModeBar: false,
    images: [
      {
        x: 2,
        y: -1,
        sizex: 10,
        sizey: 10,
        source:
          'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v960-ning-30.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=e43a2f27ef68a4e782d43c48640e7155',
        xanchor: 'right',
        xref: 'paper',
        yanchor: 'bottom',
        yref: 'paper',
        opacity: 0.4,
      },
    ],
  };
  const config = {
    displayModeBar: false,
    // toImageButtonOptions: {
    //   format: 'png', // one of png, svg, jpeg, webp
    //   filename: 'girl',
    //   height: 50,
    //   width: 700,
    //   scale: 12 // Multiply title/legend/axis/canvas sizes by this factor
    // }
  };

  return (
    <Container style={{ width: screenWidth }}>
      {avr ? (
        <Plotly
          data={data}
          layout={layout}
          debug
          enableFullPlotly
          style={{
            width: screenWidth,
            height: screenHeight,
            flex: 9,
            displayModeBar: false,
          }}
          config={config}
        />
      ) : (
        <Nodata />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
