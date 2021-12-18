import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BeansContainer from './pages/Beans/BeansContainer';
import BeansContent from './pages/Beans/BeansContent';
import ChooseRoom from './pages/Beans/ChooseRoom';
import ListOfNegativeBeans from './pages/Beans/ListOfNegativeBeans';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import ListOfPositiveBeans from './pages/Beans/ListOfPositiveBeans';
import WriteBeans from './pages/Beans/WriteBeans';
import UserContainer from './pages/User/UserContainer';
import Resign from './pages/User/Resign';
import CalendarContainer from './pages/Calendar/CalendarContainer';
import axios from 'axios'
import MyPage from './src/pages/User/MyPage';


function Router() {
  // const isSignin = useSelector(state => state.user.isSignin);
  const [ list, setList ] = useState([])

  useEffect(async() => {
    try{
      const lists = await axios.get('')
      setList(list.concat(lists.data.data))
    } catch(e) {
      throw new Error(e);
    }
    
  }, [])

  // console.log(isSignin)
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home list={list}/>}/>
        <Route path='/signup' element={<SignUp />}/> 
        <Route path='/signin' element={<SignIn />}/> 
        <Route path='/beanscontainer' element={<BeansContainer />}/> 
        <Route path='/beanscontent' element={<BeansContent/>}/> 
        <Route path='/chooseroom' element={<ChooseRoom />}/> 
        <Route path='/mypage' element={<MyPage />}/>
        <Route path='/usercontainer/:userid' element={<UserContainer />}/> 
        <Route path='/listofmynegativebeans' element={<ListOfNegativeBeans />}/>
        <Route path='/listofmypositivebeans' element={<ListOfPositiveBeans />}/> 
        <Route path='/resign' element={<Resign />}/> 
        <Route path='/caledarcontainer' element={<CalendarContainer />}/>
      </Routes>
    </>
  );
}

export default Router;