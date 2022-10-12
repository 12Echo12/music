import React, { useEffect } from 'react'

import style from './App.module.css'    

import DefaultLayout from './Layout/DefaultLayout'
import store from './redux/store';
import { getUserInfo } from './redux/user/slice';

    2

// import {getUserInfo} from './redux/user/slice'     3

function App() {
  useEffect(() => {
    store.dispatch(getUserInfo())
  })
  return (
     <div className={style.wrapper}>    4
      <DefaultLayout/>
    </div>
  );
}

export default App;
