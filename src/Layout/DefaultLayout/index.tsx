import { FC, useEffect } from 'react'
import Header from './Header'
import MusicBar from './MusicBar/index'
import MusicDetail from './musicDetail'

import {CSSTransition} from 'react-transition-group'
import { GetRoutes } from '../../router'
import axios from 'axios'




const DefaultLayout: FC = () => {
    return (
        <div>
            <Header />
            <GetRoutes/>
            <MusicBar />
            {/* <CSSTransition in={} timeout={300} classNames={musicDetail} unmountOnExit> */}
              <MusicDetail/>
            {/* </CSSTransition> */}
        </div> 
    )
} 

export default DefaultLayout;