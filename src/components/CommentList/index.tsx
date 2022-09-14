import { FC } from "react"
import { CommentType } from "../../type/type"
import style from './index.module.css'

import CommentItem from '../CommentItem/index'

interface CommentProps {
    commentList: CommentType[]
    onLike: (id: number, liked: 1 | 0) => void
}
const CommentList: FC<CommentProps> = (props) => {

    const { commentList, onLike } = props
    
    return (
        <div className={style.commentWrap}>
            {
                commentList?.map((item, index) => {
                    return (
                        <div className={style.commentItem} key={index}>
                            <CommentItem onLike={onLike} comment={item} />
                        </div>
                    )
                })
            }
        </div>
     
    )
}

export default CommentList