import { FC } from "react"
import { useNavigate } from "react-router-dom"
import Toast from "../../../components/Toast"
import { publicSlice } from "../../../redux/publicSlice/slice"
import store from "../../../redux/store"
import style from './index.module.css'


interface ArNameItemProps {
    artists: any[]
    className?: string
}

const ArNameItem: FC<ArNameItemProps> = ({ artists, className }) => {
    
    const navigate = useNavigate()
    const handleToAr = (id: string) => {
        console.log(id)

        if (+id === 0) {
            Toast.error('暂无该歌手信息！')
            return
        }
        store.dispatch(publicSlice.actions.setSongDetailOpen(false))
        navigate('/artist/' + id)
    }
    
    return (
        <div className={`${style.arNameItem} ${className}`}>
            {artists?.map((item: any, index: number) => (
                <div style={{ display: 'inline-block' }} key={item.id + index}>
                    {index > 0 ? <span style={{ margin: '0 5px' }}>/</span> : ''}
                    <span className={style.nameItem} onClick={() => handleToAr(item.id)}>
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default ArNameItem