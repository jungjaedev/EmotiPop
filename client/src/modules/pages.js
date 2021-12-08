const NAV_HOME = 'pages/NAV_HOME';
const NAV_CAL = 'pages/NAV_CAL';
const NAV_CHART = 'pages/NAV_CHART';
const NAV_MYPAGE = 'pages/NAV_MYPAGE';


// const NAV_

// export const pageNav = (type) => dispatch =>{
//   dispatch({ type: `NAV_${type}` })
// }

const initialState = {
  pages: {
    home: true,
    cal: false,
    chart: false,
    mypage: false
  }
}

export default function pages(state = initialState, action) {
  switch(action.type) {
    case NAV_HOME:
      return {
        ...state,
        pages: {
          home: true,
          cal: false,
          chart: false,
          mypage: false
        }
      }
    case NAV_CAL:
      return {
        ...state,
        pages: {
          home: false,
          cal: true,
          chart: false,
          mypage: false
        }
      }
    case NAV_CHART:
      return {
        ...state,
        pages: {
          home: false,
          cal: false,
          chart: true,
          mypage: false
        }
      }
    case NAV_MYPAGE:
      return {
        ...state,
        pages: {
          home: false,
          cal: false,
          chart: false,
          mypage: true
        }
      }
    default:
      return state
  }
}