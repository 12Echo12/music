import { FC, useEffect, useState } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import style from './index.module.css'
import './transition.css'

import { PersonalFmItem } from '../../personalFm'


interface SongImgChangeSwriperProps {
    songList: PersonalFmItem[]
    curIndex: number
    setCurIndex: (index: number) => void
}

const SongImgChangeSwriper: FC<SongImgChangeSwriperProps> = (props) => {

    const { songList } = props
    const [picList, setPicList] = useState<string[]>([])
    const { curIndex, setCurIndex } = props

    // 根据播放列表的数据，从中获取列表中每首歌的图片！！！！
    useEffect(() => {
        setPicList([...songList.map((item) => item?.album?.picUrl)])
    }, [songList])

    // 只有前一张图片才有的点击事件！！！
    const handelPrevClick = () => {
        if (curIndex === 0) {
            return
        }
        setCurIndex(-1)
    }
    return (
        <div className={style.imgWrap}>
            {
                <TransitionGroup className={style.imgWrap}>
                    {/* 选择要用的三张图！！！！ */}
                    {picList.map((el, idx) => {
                        if (idx === curIndex || idx === curIndex + 1 || idx === curIndex - 1) {
                            return (
                                <CSSTransition key={el} classNames='imgFade' timeout={300}>
                                    <div
                                        onClick={idx === curIndex - 1 ? handelPrevClick : undefined}
                                        key={el}
                                        className={`
                    ${idx === curIndex ? style.curImg : ''}
                    ${idx === curIndex - 1 ? style.prevImg : ''}
                    ${idx === curIndex + 1 ? style.nextImg : ''}
                  `}
                                    >
                                        <img src={el} alt='' />
                                    </div>
                                </CSSTransition>
                            )
                        } else {
                            return ''
                        }
                    })}
                </TransitionGroup>
            }
        </div>
    )
}

export default SongImgChangeSwriper