import { getNextMonth, getPrevMonth, makeDateArr } from "./calendarUtil";
import CalendarType from "./calendarType";

const initialState = {
  today: new Date(),
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  calendarDateArr: [],
  getToday: 0
}

export default function calendar(state = initialState, action) {
    switch (action.type) {
      case CalendarType.SHOWDATE:
        return {
          ...state,
          year: state.year,
          month: state.month,
        };
      case CalendarType.INCREASE:
        return {
          ...state,
          month: getNextMonth(state.month, action.payload),
        };
      case CalendarType.DECREASE:
        return {
          ...state,
          month: getPrevMonth(state.month, action.payload),
        };
      case CalendarType.SHOWCALENDAR:
        return {
          ...state,
          calendardatearr: makeDateArr(state.year, state.month),
        };
      default:
        return state;
    }
  }