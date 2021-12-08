import axios from 'axios';
import { URL } from './user'


const GET_CHART_DATA = 'chart/GET_CHART_DATA';
const GET_CHART_DATA_SUCCESS = 'chart/GET_CHART_DATA_SUCCESS';
const GET_CHART_DATA_ERROR = 'chart/GET_CHART_DATA_ERROR';

export const getChartData = (token) => async dispatch => {
  // 요청 시작 
  dispatch({ type: GET_CHART_DATA })
  try {
    console.log(token, 'flowlflowlflowflowflowflow2222222')
    const res = await axios.get(`${URL}stats`, {
      headers: { 'Content-Type':'application/json' ,
      authorization: `Bearer ${token}`},
      withCredentials: true
    },)    
    console.log(res.data, 'testtesttesttesttesttesttest')
    // if(res.data.message !== 'ok') {
    //   throw new Error('Sorry...')
    // } else if(res.data.message === 'no data') {
    //   console.log
    // }
    if(res.data.message === 'no data') {
      console.log('')
    }
    console.log(res.data.emotion, 'asdasdasdasdasdasdasd')


    dispatch({ type: GET_CHART_DATA_SUCCESS, payload: res.data.emotion })
  } catch(err) {
    dispatch({ type: GET_CHART_DATA_ERROR, err })
  }
}

const initialState = {
  chart: {
    loading: false,
    data: null,
    error: null
  } 
}

export default function chart(state = initialState, action) {
  switch(action.type) {
    case GET_CHART_DATA:
      return {
        ...state,
        chart: {
          loading: true,
          data: null,
          error: null
        }
      }
    case GET_CHART_DATA_SUCCESS:
      return {
        ...state,
        chart: {
          loading: false,
          data: action.payload,
          error: null
        }
      }
    case GET_CHART_DATA_ERROR:
      return {
        ...state,
        chart: {
          loading: false,
          data: null,
          error: action.err
        }
      }
    default:
      return state;
  }
} 