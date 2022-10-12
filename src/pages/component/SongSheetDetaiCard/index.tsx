import { FC, useState } from "react"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import style from './index.module.css'


import MuTable, { TableColumnType } from "../../../components/MuTable"
import { addMusic } from "../../../controller/musicController"
import { useSongSheet } from '../../../hooks/useSongSheet'

import { ToplistType } from '../../../type/topListItem'
import { SongType } from '../../../type/song'
import { SongSheetType } from '../../../type/songSheet'

interface SongSheetDetailCardProps {
    songSheetBaseInfo: ToplistType
}



const SongSheetDetailCard: FC<SongSheetDetailCardProps> = (props) => {

    const { songSheetBaseInfo } = props

    // 根据每个歌单的id获得信息、加载状态！！！
    const [songSheetInfo, isLoading] = useSongSheet(songSheetBaseInfo.id)

    const [rankMusic, setRankMusic] = useState<SongType[] | null>(null)



    // 每列显示的信息！！！！
    const columns: TableColumnType[] = [
        {
            title: 'idx',
            dataIndex: 'idx',
            key: 'idx',
            render: (data: any, idx: number) => {
                return <span className={`line1 ${style[`top${idx + 1}`]}`}>{idx + 1}</span>
            },
            width: '30px',
            align: 'center'
        },
        {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            render: (data: any) => {
                return <span className={`line1`}>{data.name}</span>
            },
            // width: '';
            align: 'left'
        },
        {
            title: '歌手',
            dataIndex: 'ar',
            key: 'ar',
            render: (data: any) => {
                return (
                    <span style={{ padding: '0 10px' }} className={`line1`}>
                        {data.ar.map((item: any) => item.name).join('/')}
                    </span>
                )
            },
            width: '200px',
            align: 'right'
        }
    ]

    // 双击每行，播放歌曲！！！
    const onColDoubleClick = (data: any) => {
        addMusic(data)
    }
    
    return (
        <div>
            {
                isLoading ? (
                    <div>加载中....</div>
                ) : (
                        < div className={style.cardWrap}>
                            {/* 歌单封面 */}
                            <div className={style.left}>
                                <img className={style.leftImg} src={songSheetInfo?.coverImgUrl} alt='' />
                            </div>
                            {/* 可变列表 */}
                            <div className={style.right}>
                                <MuTable
                                    onColDoubleClick={onColDoubleClick}
                                    hideHeader
                                    columns={columns}
                                    data={rankMusic!}
                                />
                                {/* 查看歌单所有内容！！！ */}
                                <Link className={style.seeMore} to={'/songSheet/' + songSheetInfo?.id}>
                                    查看全部
                                    <RightOutlined />
                                </Link>
                            </div>
                        </div> 
                ) 
            }
        </div>
    )
}

export default SongSheetDetailCard