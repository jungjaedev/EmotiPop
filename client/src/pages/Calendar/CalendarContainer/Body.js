import React from "react";
import { View } from "react-native";
import Dates from './Dates';
import styled from 'styled-components';

const Body = () => {
  const getMonth = new Date().getMonth() + 1;

  return (
    <View>
      <Form>
      
            <Dates
            ></Dates>
    </Form>
    </View>
  )
}

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default Body;