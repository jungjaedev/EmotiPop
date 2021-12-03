import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { Link } from "react-router-dom";
import Styled from 'styled-component';
import Modal from "react-native-simple-modal";

function WriteBeans () {
  const [modalState, setModalState] = useState({
    modalState = {open: false}
  })
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => setModalState({open: true})}>
        <Text>Open modal</Text>
      </TouchableOpacity>
      <Modal
        offset={modalState.offset}
        open={modalState.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => setModalState({open: false})}
        style={{alignItems: 'center'}}>
        <View>
          <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
          <TouchableOpacity
          style={{margin: 5}}
          onPress={() => setModalState({offset: -100})}>
            <Text>Move modal up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={() => setModalState({offset: 0})}>
            <Text>Reset modal position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={() => setModalState({open: false})}>
            <Text>Close modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default WriteBeans;