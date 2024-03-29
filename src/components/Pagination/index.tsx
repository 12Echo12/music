import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import style from './index.module.css'

interface PaginationProps {
    total: number
    pageCurrent?: number
    defaultCurrent?: number
    onChangeCurrentPage?: (page: number) => void
}


const Pagination: FC<PaginationProps> = (props) => {

    // 接收传过来的 props 属性，总共的评论数、换页。当前页数
    const { total, defaultCurrent = 1, onChangeCurrentPage, pageCurrent } = props

    const [current, setCurrent] = useState(defaultCurrent)

    // 得到的评论列表
    const [pagerList, setPagerList] = useState<any>([])

    // 根据评论列表 设计底部的分页显示情况！！！！！！！
    useEffect(() => {
        const startIdx =
            current - 3 > 1 ? (current + 3 <= total ? current - 3 : total - 6 > 1 ? total - 6 : 2) : 2
        const endIdx =
            current + 3 < total
                ? current - 3 > 1
                    ? current + 3
                    : 7 + startIdx - 1 > total
                        ? total - 1
                        : 7 + startIdx - 1
                : total - 1
        const _pagerList = []
        if (startIdx > 2) {
            _pagerList.push(
                <div key={'left'} className={style.paginationItem}>
                    …
                </div>
            )
        }
        for (let i = startIdx; i <= endIdx; i++) {
            _pagerList.push(
                <div
                    className={`${style.paginationItem} ${i === current ? style.active : ''}`}
                    onClick={() => {
                        changeCurrentPage(i)
                    }}
                    key={i}
                >
                    {i}
                </div>
            )
        }
        if (endIdx < total - 1) {
            _pagerList.push(
                <div key={'right'} className={style.paginationItem}>
                    …
                </div>
            )
        }
        setPagerList(_pagerList)
    }, [current, total])

    useEffect(() => {
        pageCurrent && setCurrent(pageCurrent)
    }, [pageCurrent])

    const changeCurrentPage = (i: number) => {
        setCurrent(i)

        onChangeCurrentPage && onChangeCurrentPage(i)
    }

    return (
        <div className={style.paginaionWrap}>
            <div
                onClick={() => {
                    if (current > 1) changeCurrentPage(current - 1)
                }}
                className={`${style.paginationItem} ${current > 1 ? '' : style.disable}`}
            >
                <LeftOutlined />
            </div>
            <div
                onClick={() => {
                    changeCurrentPage(1)
                }}
                key={1}
                className={`${style.paginationItem} ${1 === current ? style.active : ''}`}
            >
                1
            </div>
            {pagerList}
            {total > 1 && (
                <div
                    onClick={() => {
                        changeCurrentPage(total)
                    }}
                    key={total}
                    className={`${style.paginationItem} ${total === current ? style.active : ''}`}
                >
                    {total}
                </div>
            )}
            <div
                onClick={() => {
                    if (current < total) changeCurrentPage(current + 1)
                }}
                className={`${style.paginationItem} ${current < total ? '' : style.disable}`}
            >
                <RightOutlined />
            </div>
        </div>
    )
}


export default Pagination