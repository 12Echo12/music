
import { FC, useEffect, useState } from 'react'

import style from './QrCodeLogin.module.css'

import qrCodeTipImage from '../../../assets/img/qrCodeSuggest.png'

import store from '../../../redux/store'
import { getUserInfo } from '../../../redux/user/slice'


interface QrCodeLoginProps {
    handleClose: () => void
}

// 枚举类型（登录状态）
enum QRCodeStatus {
    //二维码加载
    LOADING = 404,
    //等待扫码
    WAITING = 801,
    //授权中
    AUTHORIZING = 802,
    //登录成功
    SUCCESS = 803,
    //二维码失效或已过期
    FAIL = 800
}

// node.js 里的计时器模块
let timer: NodeJS.Timer | null = null

const QrCodeLogin: FC<QrCodeLoginProps> = ({ handleClose }) => {
    // 登录状态
    const [qrState, setQrState] = useState<QRCodeStatus>(QRCodeStatus.LOADING)
    // 登录二维码的设置
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState('')
    return (
        // 先默认设置登录状态为 404（二维码加载中）
        setQrState(QRCodeStatus.LOADING)
        
    )
}