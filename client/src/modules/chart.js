import axios from 'axios';
import { URL } from './user'


const GET_CHART_DATA = 'chart/GET_CHART_DATA';
const GET_CHART_DATA_SUCCESS = 'chart/GET_CHART_DATA_SUCCESS';
const GET_CHART_DATA_ERROR = 'chart/GET_CHART_DATA_ERROR';

export const getChartData = (token) => async dispatch => {
  // 요청 시작 
  dispatch({ type: GET_CHART_DATA })
  try {
    // console.log(token, 'flowlflowlflowflowflowflow2222222')
    const res = await axios.get(`${URL}stats`, {
      headers: { 'Content-Type':'application/json' ,
      authorization: `Bearer ${token}`},
      withCredentials: true
    },)    
    console.log(res.data, 'testtesttesttesttesttesttest')
    if(res.data.message === 'ok') {
      const { 기쁨, 행복, 만족, 뿌듯, 설렘, 슬픔, 우울, 걱정, 분노, 실망 } = res.data.emotion;
      const emotions = {
        기쁨, 
        행복,
        만족,
        뿌듯,
        설렘,
        슬픔,
        우울,
        걱정,
        분노,
        실망,
      }
      const bean = makeAvg(emotions)
      const firstBean = bean[0];
      console.log(bean, '+++++++++++++++++++')
      bean.push(firstBean)
      dispatch({ type: GET_CHART_DATA_SUCCESS, bean })
    }
    
  } catch(err) {
    dispatch({ type: GET_CHART_DATA_ERROR, err })
  }
}

function makeAvg(emotion) {
  const arrEmo = Object.entries(emotion)
  const total = arrEmo.reduce((acc, cur) => acc + cur[1], 0)
  const levels = arrEmo.map(item => item[1])
  const percentage = levels.map(el => Math.round(el / total * 100))
  let beans = [];
  
  for(let i = 0; i < 10; i++) {
    beans.push({[arrEmo[i][0]]: percentage[i]}) 
  }
  return beans;
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
          data: action.bean,
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