
import { FC, useEffect, useState } from 'react'

import style from './index.module.css'

import qrCodeTipImage from '../../../assets/img/qrCodeSuggest.png'

import store from '../../../redux/store'
import { getUserInfo } from '../../../redux/user/slice'

// 后端接口！！！！
import {
    getQRCodeKey,
    getQRCodeImage,
    checkQRCodeStatus,
    checkLoginStatus
} from '../../../service/api/login'
import Toast from '../../Toast'


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
    // 登录状态的设置
    const [qrState, setQrState] = useState<QRCodeStatus>(QRCodeStatus.LOADING)
    // 二维码路径的获取设置
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState('')

    ///// 获取二维码！！！
    const getQrImg = () => {
        // 先设置二维码状态为 加载中...
        setQrState(QRCodeStatus.LOADING)

        // 获取每个用户独有的 key
        getQRCodeKey().then((res: any) => {
            if (res.code === 200) {
                const qrCodeKey = res.data.unikey
                // 根据用户的 key 去获取二维码
                getQRCodeImage(qrCodeKey)
                    .then((res: any) => {
                        if (res.code === 200) {
                            // 通过后端接口 获得了二维码的地址
                            const qrCodeImageUrl = res.data.qrimg
                            // 将二维码地址更新到状态中
                            setQrCodeImageUrl(qrCodeImageUrl)
                            //开始监听状态
                            checkStatus(qrCodeKey)
                        }
                    })
                    // 获取失败
                    .catch(() => {
                        setQrState(QRCodeStatus.FAIL)
                        // getQrImg()
                    })
            }
        })
    }

    ///// 监听并设置二维码的状态
    const checkStatus = (qrCodeKey: string) => {
        if (timer) {
            clearInterval(timer)
        }
        // 得到二维码后 设置二维码状态为 等待扫码中
        setQrState(QRCodeStatus.WAITING)


        timer = setInterval(() => {
            // 监听从后端返回的 二维码的状态
            checkQRCodeStatus(qrCodeKey).then((res: any) => {
                if (res.code === 800) {
                    clearInterval(timer!)
                    setQrState(QRCodeStatus.FAIL)
                }
                if (res.code === 802) {
                    setQrState(QRCodeStatus.AUTHORIZING)
                }
                if (res.code === 803) {
                    // 这一步会返回cookie
                    clearInterval(timer!)

                    setQrState(QRCodeStatus.SUCCESS)

                    // 使用 localStorage 储存登录数据！！！
                    localStorage.setItem('cookie', res.cookie)
                    // 弹出消息 ： 登录成功
                    Toast.success('登陆成功')
                    // 登录成功后 获取用户信息
                    store.dispatch(getUserInfo())
                    // 自动关闭该登录页面
                    handleClose()
                    window.location.reload()
                }
            })
        }, 2000)
    }

    useEffect(() => {
        getQrImg()
        return () => {
            // 有计时器先清除计时器
            
            clearInterval(timer!)
        }
    }, [])

    return (
        <div className={style.qrCodeLogin}>
            <h2>扫码登录以体验所有功能</h2>

            {/* 二维码的大容器  点击这个容器里的任何范围都会更新二维码！！！ */}
            <div
                onClick={getQrImg}
                className={`${style.qrCodeImg} ${qrState !== QRCodeStatus.FAIL ? style.qrCodeActive : ''}`}
            >
                {/* 等待扫码、授权、登录成功这三个状态 都默认显示二维码图片 */}
                {(qrState === QRCodeStatus.WAITING ||
                    qrState === QRCodeStatus.FAIL ||
                    qrState === QRCodeStatus.AUTHORIZING) && (
                        <div>
                            <img className={style.qrCodeImage} src={qrCodeImageUrl} alt='' />
                            <img className={style.qrCodeTipsImage} src={qrCodeTipImage} alt='' />
                        </div>
                    )}
                {/* 二维码加载中状态  不会显示二维码  而是会显示二维码加载中！！！！ */}
                {qrState === QRCodeStatus.LOADING && (
                    <div className={style.qrCodeLoading}>二维码加载中...</div>
                )}
                {/* 二维码失效或已过期 状态 会显示 二维码已失效 点击刷新！！！ */}
                {qrState === QRCodeStatus.FAIL && (
                    <div className={style.qrCodeFail}>
                        <span>二维码已失效</span>
                        <button>点击刷新</button>
                    </div>
                )}
            </div>
            <div className={style.tips}>
                使用
                <a href='https://music.163.com/'>网易云音乐app</a>
                扫码登录
            </div>
        </div>
        
    )
}

export default QrCodeLogin