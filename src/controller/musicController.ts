import store from '../redux/store'
import { useListControl } from './listController'
import { getSongInfoAndSet, musicControlSlice } from '../redux/musicControl/slice'
import { publicSlice } from '../redux/publicSlice/slice'
import audioInstance from './musicPlayer'
// 防抖
import { debounce, throttle } from '../utils'

import { off } from 'process'

import { musicListSlice } from '../redux/musicList/slice'
import { getSongDetail } from '../service/api/music'



//新增一首音乐
export const AddMusic = async (data: any, options = { needPlay: true, needFetch: false }) => {
    const listControl = useListControl()
    const { current } = listControl.getList()

    const { idx } = GetMusicById(data.id)
    if (idx == -1) {
        listControl.addSongToPlayList(data)
        store.dispatch(
            getSongInfoAndSet({
                song: data,
                needPlay: options.needPlay
            })
        )
        listControl.setCurrent(current + 1)
    } else {
        store.dispatch(
            getSongInfoAndSet({
                song: data,
                needPlay: options.needPlay
            })
        )
        listControl.setCurrent(idx)
    }
}

// 通过id来获取音乐
export const GetMusicById = (id: string) => {
    const listControl = useListControl()
    const { list } = listControl.getList()
  
    const idx = list.findIndex((item: any) => item.id === id)
    return { music: list[idx], idx }
}

// 清空播放列表
export const ClearPlayList = () => {
    const listControl = useListControl()
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
    listControl.clearList()
    store.dispatch(musicControlSlice.actions.clearMusicInfo())

    audioInstance.setUrl('')
}


//切换上下一首歌曲
export const changeMusic = debounce(async (direction: number, needPlay = true) => {
    const listControl = useListControl()
    const { list, current } = listControl.getList()
    if (list.length === 0) return
    const newIndex = (list.length + current + direction) % list.length
    audioInstance.clearCurMusic()
    listControl.curListType !== 'fmList' &&
        await store.dispatch(
            getSongInfoAndSet({
                song: list[newIndex],
                needPlay
            })
        ) &&
        listControl.setCurrent(newIndex)
    //fmlist需要特殊处理
    listControl.curListType === 'fmList' && getSongBaseInfoAndSet(list[newIndex].id)
    // store.dispatch(getSongInfoAndSet(list[newIndex]))
}, 500)


export const SetMusicList = (payload: any[], type: 'musicList' | 'fmList') => {
    const listControl = useListControl()
    listControl.setList(payload, type)

    changeMusic(0)
}

//对于歌曲信息不完全的，使用这个函数先获取歌曲详情，再加入列表
export const getSongBaseInfoAndSet = (id: number) => {
    getSongDetail(id).then((res) => {
        const song = res.songs?.[0]

        song && AddMusic(song)
    })
}