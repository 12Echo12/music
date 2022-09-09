import React, { FC } from 'react'
import { musicControlSlice, MusicControlState } from '../../redux/musicControl/slice'
import store, { RootState } from '../../redux/store'
import style from './VolumeControl.module.css'
import audioInstance from '../../controller/musicPlayer'
import { useSelector } from '../../redux/hooks'


interface VolumeControlProps{
    id?:string
}

const VolumeControl: FC<VolumeControlProps> = (props) => {
    const { id } = props;

    const isMute = useSelector((state: RootState) => state.musicControl.isMute)
    const volume = useSelector((state: RootState) => state.musicControl.volume)
    const duration = useSelector((state: RootState) => state.musicControl.duration)
    
    const setProgress = (progress: number) => {
        store.dispatch(musicControlSlice.actions.setProgress(progress))
    }
    // 通知全局状态的函数
    const setPercent = (percent: number) => {
        audioInstance.setCurrentTime((percent / 100) * duration)
        setProgress(percent)
    }

    // 设置音量的函数
    const setVolume=(percent: number)=> {
        audioInstance.setVolume(percent)
    }

    // 点击音量条来直接调音量大小
    const handlePgClick = (e: React.MouseEvent<HTMLDivElement>) => {
        //鼠标距离底部的距离

        const bottom = e.currentTarget.getBoundingClientRect().bottom - e.clientY

        const percent = bottom / e.currentTarget.offsetHeight
 
        // 设置音量的函数
        setVolume(percent)
    }
    
    // 1 . 点击小圆点所触发的事件  通过拖动小圆点来调节音量大小
    const handleMouseDownDot = (e: React.MouseEvent<HTMLDivElement>) => {
        const barEl = document.getElementById('volumeBar' + id)
        const curBarEl = document.getElementById('curVolumeBar' + id)
            setBarPercent(e, barEl!, curBarEl!, 'column', (percent: number) => {
               setVolume(percent)
        })
    }

    // 2 . 点击小圆点后触发的事件
    const setBarPercent = (
        e: React.MouseEvent<HTMLDivElement>,
        barEl: HTMLElement,
        curBarEl: HTMLElement,
        direction: 'row' | 'column' = 'row',
        setPercent: (percent: number) => void
    ) => {
        const length = direction === 'row' ? barEl!.offsetWidth : barEl!.offsetHeight
        const curLength = direction === 'row' ? curBarEl!.offsetWidth : curBarEl!.offsetHeight

        const offset = direction === 'row' ? e.clientX - curLength : e.clientY + curLength - length

        const _mouseMoveHandler = (e: any) => {
            const curLength = direction === 'row' ? e.clientX - offset : e.clientY - offset

            let percent = direction === 'row' ? curLength / length : (length - curLength) / length

            percent = percent > 1 ? 1 : percent < 0 ? 0 : percent
            setPercent(percent)
        }

        // 3 . 设置鼠标移动 move 的监听事件
        window.addEventListener('mousemove', _mouseMoveHandler)
        // 4 . 设置鼠标弹起（移开）up 的监听事件
        window.addEventListener('mouseup', () => {
            // 5 . 取消对鼠标移动的监听事件
            window.removeEventListener('mousemove', _mouseMoveHandler)
        })
    }
    return (
        // 音量条的盒子
        <div className={style.volumeControl}>
            {/* 整个音量条 */}
            <div
                id={'volumeBar' + id}
                onClick={handlePgClick}
                className={style.progress}
            >
                {/* 音量大小条（红色） */}
                <div className={style.progressBar}>
                    <div
                        id={'curVolumeBar' + id}
                        style={{ height: `${isMute === true ? 0 : volume * 100}%` }}
                        className={style.curBar}
                    >
                        {/* 小圆点 */}
                        <div onMouseDown={handleMouseDownDot} className={style.dot}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VolumeControl