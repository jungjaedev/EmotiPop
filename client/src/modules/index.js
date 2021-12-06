import { combineReducers } from 'redux';
import user from './user'
import beans from './user'


const rootReducer = combineReducers({
  user,
  beans,
})

export default rootReducer;