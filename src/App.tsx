import React, { useEffect } from 'react'

// import style from './App.moudle.css'    1

import DefaultLayout from './Layout/DefaultLayout'
import store from './redux/store';
import { getUserInfo } from './redux/user/slice';

// import store  from './redux/store'      2

// import {getUserInfo} from './redux/user/slice'     3

function App() {
  useEffect(() => {
    store.dispatch(getUserInfo())
  })
  return (
    //  <div className={style.wrapper}>    4
    //   <DefaultLayout/>
    // </div>
  );
}

export default App;
