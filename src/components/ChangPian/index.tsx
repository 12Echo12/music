import { FC } from "react";

import styled from 'styled-components'
import style from './index.module.css'
// 唱片的针
import changzhen from '../../assets/img/changzhen.png'

interface ChangPianProps {
    isPlaying: boolean
    songPicUrl: string
}

const ChangPian: FC<ChangPianProps> = (props) => {

    const { isPlaying , songPicUrl} = props
    return (
        <div className={`${style.songPicWrap} ${isPlaying ? style.changPianPlay : ''}`}>
            {/* 长针 */}
            <div className="changZhen">
                <img src={changzhen} alt=''/>
            </div>
            {/* 唱片部分 */}
            <div className={style.changPian}>
                {/* 唱片纹部分 */}
                <div className={style.changPianWen}>
                    <ChangPianWen idx={1} />
                    <ChangPianWen idx={2} />
                    <ChangPianWen idx={3} />
                    <ChangPianWen idx={4} />
                </div>
                {/* 唱片里面的图片 */}
                <div className={style.changPianInner}>
                    <div className={style.changPianPic}>
                        <img src={songPicUrl} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangPian

const ChangPianWen = styled.div<{ idx: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => `${240 - 10 * props.idx}px`};
  height: ${(props) => `${240 - 10 * props.idx}px`};
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #292a2c;
`