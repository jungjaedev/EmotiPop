import React, { useEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const chartConfig = {
  backgroundGradientFrom: "red",
  backgroundGradientFromOpacity: 5,
  backgroundGradientTo: "blue",
  backgroundGradientToOpacity: .3,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
const { width: screenWidth } = Dimensions.get('window')

export default function ChartTest({navigation}) {
  const data = {
    labels: ["행복", "슬픔", "걱정", "화남", "우울", "설렘", "만족", "편안", "뿌듯", "신남"], // optional
    data: [.5, 1.1, 1.8, 1, 1.5, .7, 1.7, 1, .7, .1]
  };
  const data2 = [
    {
      name: "행복",
      population: 5,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "슬픔",
      population: 11,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "걱정",
      population: 18,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "화남",
      population: 3,
      color: "#47f637",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "우울",
      population: 15,
      color: "rgb(231, 210, 14)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "설렘",
      population: 7,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "만족",
      population: 17,
      color: "rgb(6, 145, 226)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "편안",
      population: 1,
      color: "rgb(212, 181, 41)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "뿌듯",
      population: 7,
      color: "rgb(255, 51, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "신남",
      population: 1,
      color: "rgb(47, 47, 151)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
  const emotions = { 
    emotion: { 
      '행복': 5, '슬픔': 11, '걱정': 18, '화남': 10, '우울': 15, '설렘': 7, '만족': 17, '편안': 10, '뿌듯': 7, '신남': 10
    } 
  }
  return(
    <ScrollView>
        {/* <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={10}
          radius={20}
          chartConfig={chartConfig}
          hideLegend={false}
        /> */}
        <PieChart
          data={data2}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 20]}
          absolute
        />
        <LineChart
        data={{
          labels: ["행복", "슬픔", "걱정", "화남", "우울", "설렘", "만족", "편안", "뿌듯", "신남"],
          datasets: [
            {
              data: [
                5, 11, 18, 10, 15, 7, 17, 10, 7, 10
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "dodgerblue",
          backgroundGradientFrom: "gold",
          backgroundGradientTo: "dodgerblue",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>
  )
}
