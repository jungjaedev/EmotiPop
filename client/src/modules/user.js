import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const SIGN_IN = 'user/SIGN_IN';
const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'user/SIGN_IN_ERROR';
const SIGN_OUT = 'user/SIGN_OUT';
const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'user/SIGN_OUT_ERROR';
// export const URL = 'http://localhost:80/'
export const URL = 'http://10.0.2.2:80/'


export const reqSignIn = (info) => async dispatch => {
  // 요청이 시작됨.a
  dispatch({ type: SIGN_IN });
  // api 호출
  try {
    const { data } = await axios.post(`${URL}users/signin`, info, { headers: {'Content-Type': 'application/json'}, withCredentials: true});
    const userData = data.userinfo;
    console.log(userData)
    const {id, email, username, accessToken} = userData;
    await AsyncStorage.setItem('AccessToken', accessToken)
    const user = { id, email, username }
    dispatch({ type: SIGN_IN_SUCCESS, user})
  } catch(err) {
    dispatch({ type: SIGN_IN_ERROR, error: err})
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
      AsyncStorage.clear()
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
      const res = await axios.get(`${URL}users/me`, { headers: { authorization: `Bearer ${token}` }, withCredentials: true })
      if(res.data.message !== 'get your information completed') {
        return
      }
      const { id, email, username } = res.data.userinfo;
      const userData = { id, email, username}
      // const dummy = { email: userData.email, password: 'qwer1234'}
      dispatch({ type: SIGN_IN_SUCCESS, userData})
    } catch(err) {
      dispatch({ type: SIGN_IN_ERROR })
    }
}


const initialState = {
  signIn: {
    loading: false,
    user: null,
    error: null,
    isLogin: false
  },  
}

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
          error: action.err,
          isLogin: false
        }
      }
    default:
      return state;
  }
}

















/*
export const SIGN_IN = 'user/SIGN_IN';
const SIGN_OUT = 'user/SIGN_OUT';
const START = 'user/START';
const ERROR = 'user/ERROR';

// const reqLogin = async (payload) => {
//   try{
//     const req = await axios('https://localhost:8080', 
//     { payload }, 
//     { headers: {'Content-Type': 'application/json'}, withCredentials: true})
//     const info = await req;
//     if(info.message === 'Login Completed') {
//     }
//   } catch(err) {
//     if(err) {
//     }
//   }
// }

export const logIn = (payload) => ({
    type: SIGN_IN,
    payload
})

export function logOut() {
  return {
    type: SIGN_OUT,
  }
}

export function validate() {
  return {

  }
}

// const initialState = {
//   user: [],
//   isLogin: false,
//   isValid: false,
// }

const initialState = {
  user: {},
  isSignin: false,
  authorization: false,
  // accessToken: ''
}

// const initialState = {
//   user: {
//     id: 1,
//     email: 'qwer@naver.com',
//     password: 'qwer123$'
//   },
//   isLogin: false,
//   isValid: false
// }

export default function user(state = initialState, action) {
  switch(action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignin: true,
        user: {...action.payload}
      }
    case SIGN_OUT:
      return {
        ...state,
        user: {}
      }
    default:
      return state;
  }
}
*/