import { FC } from "react"
import style from "./index.module.css"

interface anchor1ItemProps{ }

const anchor1Item: FC<anchor1ItemProps> = () => {
    return (
        <div className={style.anItem}>
            {/* 照片部分 */}
            <div className={style.img}>
                <img ></img>
            </div>
        </div>
    )
}

export default anchor1Item