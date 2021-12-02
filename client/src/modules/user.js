import axios from 'axios';

const SIGN_IN = 'user/SIGN_IN';
const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'user/SIGN_IN_ERROR';
const SIGN_OUT = 'user/SIGN_OUT';
const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'user/SIGN_OUT_ERROR';



export const reqSignIn = (info) => async dispatch => {
  // 요청이 시작됨.
  // dispatch({ type: SIGN_IN });

  // // api 호출
  // try {
  //   const user = await axios('http://localhost:8080/users/signin', info, { headers: {'Content-Type': 'application/json'}, withCredentials: true});
  //   dispatch({ type: SIGN_IN_SUCCESS, user })
  //   return user;
  // } catch(err) {
  //   dispatch({ type: SIGN_IN_ERROR, error: err})
  // }
  dispatch({ type: 'user/SIGN_IN' })
  console.log(info)
  //! Test
  try {
    const dummy = await axios('https://koreanjson.com/users/1')
    dispatch({ type: 'user/SIGN_IN_SUCCESS', dummy})
  } catch(err) {
    dispatch({ type: 'user/SIGN_IN_ERROR', error: err })
  }
}

export const reqSignOut = (token) => async dispatch => {
  dispatch({ type: SIGN_OUT });
  // token
  // api
  try {
    const req = await axios.post('http://localhost:8080/users/signout',
    { headers: { authorization: `Bearer ${token}` }, withCredentials: true })
    if(req.message === 'successfully signed out!') {
      dispatch({ type: SIGN_OUT_SUCCESS })
    }
  } catch(err) {
    dispatch({ type: SIGN_OUT_ERROR, error: err })
  }
}

const initialState = {
  signIn: {
    loading: false,
    user: null,
    error: null
  }
    
}

export default function signIn(state = initialState, action) {
  switch(action.type) {
    case SIGN_IN:
      return {
        ...state,
        signIn: {
          loading: true,
          user: null,
          error: null
        }
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signIn: {
          loading: false,
          user: action.user,
          error: null
        }
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        signIn: {
          loading: false,
          user: null,
          error: action.err
        }
      }
    default:
      return state;
  }
}
















/* 

const START = 'user/START';
const SIGN_IN = 'user/SIGN_IN';
const ERROR = 'user/ERROR';
const SIGN_OUT = 'user/SIGN_OUT';

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

export const logIn = (payload) => {
  return {
    type: SIGN_IN,
    payload
  }
}

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
  user: [],
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
        user: state.user.concat(action.payload)
      }
    case SIGN_OUT:
      return {
        ...state,
        user: []
      }
    default:
      return state;
  }
}
*/