// 创建Login组件
import { CloseOutlined } from '@ant-design/icons'
import { FC } from 'react'
import style from './index.module.css'
import createLogin from '../login/index'
import QrCodeLogin from './qrCodeLogin/index'
import { useNavigate } from 'react-router-dom'


interface LoginProps { }

const Login: FC<LoginProps> = () => {
    // 关闭登录页面的click方法
    const navigate = useNavigate();
    const handleClose = () => {
        createLogin.destroy()
    }
    return (
        <div className={style.LoginWrap}>
            <div className={style.loginContent}>
                <div className={style.loginHeader}>
                    <div onClick={handleClose} className={style.loginClose}>
                        <CloseOutlined />
                    </div>
                </div>
                <div className={style.loginTitle}>
                    <div className={style.qrCodeLogin}>
                        <QrCodeLogin handleClose={handleClose} />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Login