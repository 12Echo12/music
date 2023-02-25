import React, { useEffect } from 'react'
import style from './App.module.css'    
import DefaultLayout from './Layout/DefaultLayout'
import store from './redux/store';
import { getUserInfo } from './redux/user/slice';

    

// import {getUserInfo} from './redux/user/slice'     3

function App() {
  // 一加载页面就开始渲染！！！
  useEffect(() => {
    store.dispatch(getUserInfo())
  })
  return (
     <div className={style.wrapper}>    
      <DefaultLayout/>
    </div>
  );
}

export default App;
