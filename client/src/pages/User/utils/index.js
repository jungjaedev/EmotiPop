import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';


const user = {
  email: 'ajrfyd@naver.com',
  password: 'qwerqwer'
}
export const signChk = (email, pass) => {
  if(email === user.email && pass === user.password) {
    return {
      message: 'ok'
    }
  } else {
    return {
      message: 'not Ok'
    }
  }
}

export const signInChkAsync = async () => {
  const token = await AsyncStorage.getItem('Token');
  if(token) {
    const parseToken = JSON.parse(token);
    const auth = await axios('http://localhost:8080/', {
      headers: {
        authorization: `Bearer ${parseToken}`,
        'Content-Type': 'application/json'
      }, withCredentials: true
    })
    if(auth) {
      return true;
    }
  }
}