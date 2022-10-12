import { FC } from 'react'
import Header from './Header'
import MusicBar from './musicDetail'
import MusicDetail from './musicDetail'

import {CSSTransition} from 'react-transition-group'
import { GetRoutes } from '../../router'




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