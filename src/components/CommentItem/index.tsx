import { FC } from "react"
import { Link } from 'react-router-dom'

//less 文件的导入
import style from './index.module.less'

import { LikeOutlined } from '@ant-design/icons'

// formatTime 格式化时间
import { formatTime } from '../../utils'
import { CommentType } from '../../type/type'

interface CommentItemProps {
    comment: CommentType
    onLike: (id: number, liked: 0 | 1) => void
}

const CommentItem: FC<CommentItemProps> = ({comment,onLike}) => {
    
    return (
        <div className={style.commentItem}>
            {/* 头像信息 */}
            <div className={style.avatar}>
                <img src={comment.user.avatarUrl} alt='' />
            </div>
            {/* 评论内容 */}
            <div className={style.content}>
                <div className={style.commentContent}>
                    {/* 用户ID */}
                    <Link to={'/user/' + comment.user.userId}>
                        <div className={style.userName}>{comment.user.nickname}：</div>
                    </Link>
                    <div className={style.commentDesc}>{comment.content}</div>
                </div>
                {/* 评论被回复的内容 */}
                {comment.beReplied.length > 0 && (
                    <div className={style.commentReplied}>
                        <div className={style.replied}>
                            {/* 回复人的头像 */}
                            <img
                                className={style.repliedAvatar}
                                src={comment?.beReplied?.[0]?.user.avatarUrl}
                                alt=''
                            />
                            {/* 回复人的id */}
                            <div className={`${style.repliedNickName} link`}>
                                {comment?.beReplied?.[0]?.user.nickname}：
                            </div>
                            {/* 回复的内容 */}
                            <div className={style.repliedContent}>{comment?.beReplied?.[0]?.content}</div>
                        </div>
                    </div>
                )}
                {/* 底部部分 */}
                <div className={style.footer}>
                    {/* 评论发布时间 */}
                    <div className={style.time}>{formatTime(comment.time, 'YYYY年MM月DD日 HH:mm')}</div>
                    <div className={style.otherRight}>
                        {/* 点赞的图标和点赞数 */}
                        <div
                            className={`${style.star} ${comment.liked ? style.liked : ''}`}
                            onClick={() => {
                                onLike(comment.commentId, comment.liked ? 0 : 1)
                            }}
                        >
                            <LikeOutlined /> {comment.likedCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default CommentItem