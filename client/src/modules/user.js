import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Google from 'expo-google-app-auth';


// Action type
const SIGN_IN = 'user/SIGN_IN';
const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'user/SIGN_IN_ERROR';
const SIGN_OUT = 'user/SIGN_OUT';
const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'user/SIGN_OUT_ERROR';
// export const URL = 'http://localhost:80/'
// export const URL = 'http://10.0.2.2:80/'
export const URL = 'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/'


// Thunk 생성 함수
export const reqSignIn = (info) => async dispatch => {
  // 요청이 시작됨.a
  dispatch({ type: SIGN_IN });
  // api 호출
  try {
    const { data } = await axios.post(`${URL}users/signin`, info, { headers: {'Content-Type': 'application/json'}, withCredentials: true });
    const userData = data.userinfo;
    // console.log(userData)
    const {email, username, accessToken} = userData;
    await AsyncStorage.setItem('AccessToken', accessToken)
    const user = { email, username }
    dispatch({ type: SIGN_IN_SUCCESS, user })
  } catch(err) {
    dispatch({ type: SIGN_IN_ERROR, error: err })
  }
}

export const reqSignOut = (token) => async dispatch => {
  dispatch({ type: SIGN_OUT });
  // token
  // api
  try {
    const req = await axios.post(`${URL}users/signout`,
    { headers: { authorization: `Bearer ${token}` }, withCredentials: true })
    if(req.data.message === 'successfully signed out!') {
      await AsyncStorage.removeItem('AccessToken')
      dispatch({ type: SIGN_OUT_SUCCESS })
    }
  } catch(err) {
    dispatch({ type: SIGN_OUT_ERROR, error: err })
  }
}

export const reSignIn = (token) => async dispatch => {
    if(!token) {
      return
    }
    try{
      // console.log(token)
      const res = await axios.get(`${URL}users/me`, { headers: { authorization: `Bearer ${token}` }, withCredentials: true })
      if(res.data.message !== 'get your information completed') {
        return;
      }
      const { id, email, username } = res.data.userinfo;
      const userData = { email, username}
      // const dummy = { email: userData.email, password: 'qwer1234'}
      dispatch({ type: SIGN_IN_SUCCESS, userData})
    } catch(err) {
      dispatch({ type: SIGN_IN_ERROR })
    }
}

export const googleSignIn = () => async dispatch => {
  dispatch({ type: SIGN_IN })
  try {
    const res = await Google.logInAsync({
      androidClientId: `122121037503-0asfns1mbs2759mv1jij9ppfk2k474hp.apps.googleusercontent.com
    `});
    if(!res) {
      return 
    }
    const googleRes = await axios.post(`${URL}oauth/signin`, res)
    const { email, username, accessToken } = googleRes.data.userinfo;
    await AsyncStorage.setItem('AccessToken', accessToken)
    const userData = { email, username }
    dispatch( {type: SIGN_IN_SUCCESS, userData })
  } catch(error) {
    dispatch({ type: SIGN_IN_ERROR, error })
  }
}


// initialState
const initialState = {
  signIn: {
    loading: false,
    user: null,
    error: null,
    isLogin: false
  },  
}


// Reducer
export default function signIn(state = initialState, action) {
  switch(action.type) {
    case SIGN_IN:
      return {
        ...state,
        signIn: {
          loading: true,
          user: null,
          error: null,
          isLogin: false
        }
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signIn: {
          loading: false,
          user: action.user,
          error: null,
          isLogin: true,
        }
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        signIn: {
          loading: false,
          user: null,
          error: action.error,
          isLogin: false
        }
      }
    default:
      return state;
  }
}













