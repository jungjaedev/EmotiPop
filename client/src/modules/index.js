import { combineReducers } from 'redux';
import user from './user'
import beans from './user'
import pages from './pages'
import chart from './chart'


const rootReducer = combineReducers({
  user,
  beans,
  pages,
  chart,
})

export default rootReducer;