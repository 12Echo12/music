import { FC, useEffect, useState } from 'react'
import style from './index.module.css'
import styled from 'styled-components'


interface ProgressBarProps {
    percent: number
    underPercent?: number
    setPercent: (percent: number) => void
    onChangeStart?: () => void
    onChangeing?: () => void
    onChangeEnd?: () => void
    height?: number
}

const ProgressBar: FC<ProgressBarProps> = ({
    percent,
    setPercent,
    onChangeStart,
    onChangeEnd,
    onChangeing,
    underPercent = 0,
    height = 5
}) => {
    const [random, setRandom] = useState<string>()
    useEffect(() => {
        // 生成四位随机字符串
        const random = Math.random().toString(36)
        setRandom(random)
    }, [])
    
    // 播放器盒子的点击事件  点击后设置percent
    const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
        const left = e.clientX - e.currentTarget.getBoundingClientRect().left
        const percent = left / e.currentTarget.offsetWidth
        setPercent(percent * 100)
    }

    // 2 . 拉着小圆点拖动 mousemove事件 ，设置percent
    const setBarPercent = (
        e: React.MouseEvent<HTMLDivElement>,
        barEl: HTMLElement,
        direction: 'row' | 'column' = 'row'
    ) => {
        onChangeStart && onChangeStart()
        const length = direction === 'row' ? barEl!.offsetWidth : barEl!.offsetHeight
        const dotWidth = e.currentTarget.offsetWidth
        const offset =
            direction === 'row'
                ? e.clientX - e.currentTarget?.offsetLeft
                : e.clientY - e.currentTarget?.offsetTop
        // 4 . 鼠标移动 move 触发的事件
        const _mouseMoveHandler = (e: any) => {
            onChangeing && onChangeing()
            //鼠标距离左边的距离
            const curLength =
                direction === 'row' ? e.clientX - offset + dotWidth : e.clientY - offset + dotWidth

            let percent = direction === 'row' ? curLength / length : (length - curLength) / length

            percent = percent > 1 ? 1 : percent < 0 ? 0 : percent
            setPercent(percent * 100)
        }

        // 3 . 绑定鼠标移动的监听事件 
        window.addEventListener('mousemove', _mouseMoveHandler)

        // 5 . 绑定鼠标离开 up 的监听事件
        window.addEventListener('mouseup', () => {
            // this.props.setAdjust(false)
            onChangeEnd && onChangeEnd()
            // 清除（不再监听鼠标拉着移动事件）
            window.removeEventListener('mousemove', _mouseMoveHandler)
        })
    }
    

    // 1 . 点击小圆点后触发的事件 （比如继续拖动会触发的 setBarPercent() ）
    const handleMouseDownDot = (e: React.MouseEvent<HTMLDivElement>) => {
        const barEl = document.getElementById('progressBar' + random)
        setBarPercent(e, barEl!)
    }



    return (
        // 整个播放器的盒子
        <div id={'progressBar' + random} onClick={handleClick} className={style.progress}>
            {/* 整个播放器 */}
            <ProgressBarStyle height={height} className={style.progressBar}>
                {/* 进度条   小圆点放在进度条里面 始终在进度条后面 */}
                <div style={{ width: `${percent}%` }} className={style.curBar}>
                    <div onMouseDown={handleMouseDownDot} className={style.dot}></div>
                </div>
                {underPercent > 0 && (
                    // 缓冲条 如果没放歌 不显示
                    <div style={{ width: `${underPercent}%` }} className={style.bufferBar}></div>
                )}
            </ProgressBarStyle>
        </div>
      )
}


export default ProgressBar

const ProgressWrap = styled.div<{ height: number }>`
  &:hover {
  }
`

const ProgressBarStyle = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
`