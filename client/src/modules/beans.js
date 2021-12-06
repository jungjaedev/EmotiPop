import axios from 'axios';
const URL = 'http://10.0.2.2:80/stats'


// Action Type
const GET_BEANS = 'beans/GET_BEANS';
const GET_BEANS_SUCCESS = 'beans/GET_BEANS_SUCCESS';
const GET_BEANS_ERROR = 'beans/GET_BEANS_ERROR';

const WEEK_EMOTION = 'beans/WEEK_EMOTION';
const WEEK_EMOTION_SUCCESS = 'beans/WEEK_EMOTION_SUCCESS';
const WEEK_EMOTION_ERROR = 'beans/WEEK_EMOTION_ERROR';



// functions 
export function getMondayDate(date) {
  // data = new Date();
  let paramDate = new Date(d);
  let day = paramDate.getDay();
  // console.log("day", day);
  // console.log(paramDate.getDate() - 7);
  let diff = paramDate.getDate() - day + (day === 0 ? -6 : 1);
  // console.log(new Date(paramDate.setDate(23)));

  return new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

}
// console.log(getMondayDate(new Date()));



// thunk 생성 함수
export const getBeans = () => async dispatch => {
  // 시작
  dispatch({ type: GET_BEANS })
  try {
    const res = await axios.get(URL, {
      headers: { 'ContentType': 'application/json'}, 
      withCredentials: true
    })
    if(!res) {
      return
    }
    dispatch({ type: GET_BEANS_SUCCESS })
  } catch(err) {
    dispatch({ type: GET_BEANS_ERROR })
  }
}

export const getWeekBeans = (data) => async dispatch => {
  dispatch({ type: WEEK_EMOTION })
  try {
    const res = await axios.post('http://10.0.2.2:80/')


    dispatch({ type: WEEK_EMOTION_SUCCESS })
  } catch(err) {
    dispatch({ type: WEEK_EMOTION_ERROR })
  }
}


// intialState
const initialState = {
  getBeans: {
    loading: false,
    beans: null,
    error: flase,
  }
}


// Reducer
export default function beans(state = initialState, action) {
  switch(action.type) {
    case GET_BEANS:
      return {
        ...state,
        getBeans: {
          loading: true,
          beans: null,
          error: false
        }
      }
    case GET_BEANS_SUCCESS:
      return {
        ...state,
        getBeans: {
          loading: false,
          beans: action.payload,
          error: false
        }
      }
    case GET_BEANS_ERROR:
      return {
        ...state,
        getBeans: {
          loading: false,
          beans: null,
          error: action.error
        }
      }
    default:
      return state;
  }
}