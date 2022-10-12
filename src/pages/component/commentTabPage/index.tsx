import { FC } from "react"
import style from './index.module.css'

import Pagination from '../../../components/Pagination'
import CommentList from '../../../components/CommentList'
import { useComment } from "../../../hooks/useComments"
import {  comment_type,likeComment } from "../../../service/api/comment"

interface CommentTabPageProps{
    id: string
    type: 'Song' | 'PlayList' | 'Album' | 'MV' | 'Video'
    onPageChange?: (page: number) => void
}
const CommentTabPage: FC<CommentTabPageProps>=(props)=>{
    const { id, type, onPageChange } = props

    // 获取状态
    const { comments, hotComments, curPage, setCurPage, total, fetchData } = useComment(id, type)


    const handleLike = (cid: number, liked: 0 | 1) => {
        likeComment(id, cid, comment_type[type], liked).then((res) => {
            if (res.code === 200) {
                fetchData()
            }
        })
    }
    
    return(
        <div className={style.comment}>
            {/* 热门评论区域 */}
            {hotComments.length > 0 && (
                <>
                    <div className={style.commentTitle}>热门评论 ({total})</div>
                    <CommentList onLike={handleLike} commentList={hotComments} />
                </>
            )}
            {/* 全部评论区域 */}
            <div className={style.commentTitle}>全部评论 ({total})</div>
            <CommentList onLike={handleLike} commentList={comments} />
            <div className={style.pagination}>
                <Pagination
                    onChangeCurrentPage={(cur) => {
                        setCurPage(cur)
                        onPageChange && onPageChange(cur)
                    }}
                    total={Math.ceil(total / 20)}
                    pageCurrent={curPage}
                />
            </div>
        </div>
    )
}


export default CommentTabPage