import Toast from '../../components/Toast'
import axRequest from '../index'


//下载歌曲
export function downLoadMusic(id: string | number, fileName: string) {
    return axRequest
        .get({
            url: MUSIC_API.DOWNLOAD_SONG,
            params: {
                id
            }
        })
        .then((res) => {
            const url = res.data.url

            Toast.success('正在下载')
            return axRequest.get({ url, responseType: 'blob' })
        })
        .then((res) => {
            const blob = res
            const binaryData = []
            binaryData.push(blob)
            const href = window.URL.createObjectURL(new Blob(binaryData))

            const a = document.createElement('a')
            a.href = href
            a.download = fileName + '.mp3'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            Toast.success('下载成功')
        })
        .catch((err) => {
            Toast.error('下载失败,请稍后重试!')
        })
}

//获取热门歌单分类
export function getHotSongSheetsCategory() {
    return axRequest.get({
        url: MUSIC_API.GET_HOT_SONG_SHEETS_CATEGORY
    })
}
