import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import React, { useEffect, useRef } from "react"
import { FC, useState } from "react"
import style from './Swiper.module.css'


interface SwiperProps {
    children: React.ReactElement<any, any>[] | React.ReactElement<any, any>
}


const Swiper: FC<SwiperProps> = (props) => {

    const { children: child } = props

    // 设置当前轮播图的 index 状态
    const [curIndex, setCurIndex] = useState(5)

    // 可以用于定时器的清除！！！！
    const timerRef = useRef<NodeJS.Timer | null>(null)
    // 获取 children 状态！！！
    let children = (Array.isArray(child) ? child : [child]) as React.ReactElement<any, any>[]

    // 获得 swiperWidth
    const [swiperWidth, setSwiperWidth] = useState(
        document.getElementById('swiper')?.clientWidth || 0
    )

    // ？？？给轮播图设置自动切换！！！！
    useEffect(() => {
        if (children.length) {
            timerRef.current = setInterval(() => {
                handleChangeIndex(1)
            }, 3000)
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [curIndex, children])

    // 通过 元素克隆的方式给元素添加属性或者样式！！！
    children = children?.map((o, i) => {
        return React.cloneElement(o, {
            index: i,
            curIndex,
            style: {
                ...(i !== (curIndex + children.length + 1) % children.length
                    ? {
                        left: '50%',
                        transform: ' translate3d(-50%,0, -10px)',
                        zIndex: 1,
                    }
                    : {}),
                ...(i === (curIndex + children.length - 1) % children.length
                    ? {
                        left: 0,
                        transform: 'rotate3d(0,1,0,2deg)',
                        transformOrigin: 'left center',
                        zIndex: 2
                    }
                    : {}),
                ...(i === (curIndex + children.length + 1) % children.length
                    ? {
                        left: "50%",
                        transform: 'translate3d(50%,0,0) rotate3d(0,1,0,-2deg)',
                        transformOrigin: 'right center',
                        zIndex: 2
                    }
                    : {}),
                ...(i === curIndex
                    ? {
                        left: '50%',
                        transform: `translate3d(-50%, 0, 5px)`,
                        zIndex: 3, 
                    }
                    : {})
            }
        })
    })

    // 左右两个按钮点击切换事件
    const handleChangeIndex = (index: number) => {
        setCurIndex((curIndex + index) % children.length)
    }


    return (
        <div id='swiper' className={style.swiperWrap}>
            {/* 下部的小圆点 */}
            <div className={style.dot}>
                {/* 遍历生成div  只要是要用每个children的 index ，跟小圆点绑上关系！！*/}
                {children.map((o, i) => {
                    return (
                        <div
                            key={i}
                            className={`${style.dotItem} ${i === curIndex ? style.active : ''}`}
                            onMouseEnter={() => {
                                setCurIndex(i)
                            }}
                        ></div>
                    )
                })}
            </div>
            <div className={style.swiper}>
                <div className={style.btn}>
                    <div onClick={() => handleChangeIndex(-1)} className={style.left}>
                        <LeftOutlined />
                    </div>
                    <div onClick={() => handleChangeIndex(1)} className={style.right}>
                        <RightOutlined />
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Swiper