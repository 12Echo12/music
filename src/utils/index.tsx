import dayjs from 'dayjs'


// 补成两位数，不足两位数的补0
export function pad(num: number) {
    return num < 10 ? '0' + num : num
}

// 将时间换算成秒
export function parseSecondToTime(second: number) {
    second = Math.floor(second)
    const hour = Math.floor(second / 3600)
    const minute = Math.floor((second - hour * 3600) / 60)
    const seconds = second - hour * 3600 - minute * 60

    return hour > 0 ? `${pad(hour)}:${pad(minute)}:${pad(seconds)}` : `${pad(minute)}:${pad(seconds)}`
}

//dayjs 时间戳转换成时间   格式化时间
export function formatTime(time: number | string, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(format)
}


// 处理返回的歌词  并返回要展示的歌词形式（对象数组），每句歌词对象里面有歌词的内容，还有该句歌词开始的时间
export const parseLrc = (lrc: string) => {
    if (!lrc) {
        return []
    }

    const lrcList = lrc.split('\n')

    const lrcArr: {
        lrc: string
        time: number
    }[] = []

    lrcList.forEach((item: string) => {
        const lyricExp = /^\[(\d{2}):(\d{2}).(\d*)\](.*)/
        const timeStr = item.match(lyricExp)
        const content = item.replace(/\[\d{2}:\d{2}\.\d*\]/g, '')

        if (timeStr) {
            const minute = +timeStr[1]
            const second = +timeStr[2]
            const millisecond = +timeStr[3]
            const totalTime = minute * 60 + second + millisecond / 1000

            lrcArr.push({
                lrc: content,
                time: totalTime
            })
        }
    })

    return lrcArr
}