// redux-toolkit
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// redux-persist
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { musicControlSlice, MusicControlState } from './musicControl/slice'
import { musicListSlice } from './musicList/slice'
import { userSlice } from './user/slice'
import { publicSlice } from './publicSlice/slice'
import { fmListSlice } from './fmList/slice'

import musicInstance from '../controller/musicPlayer'
import { changeMusic } from '../controller/musicController'

// redux-persist    转换允许您自定义持久化和重新水化的状态对象。
const SetTransform = createTransform(
    (inboundState: MusicControlState, key) => {
        return {
            ...inboundState,
            currentTime: 0,
            duration: 0,
            isPlaying: false,
            progress: 0,
            bufferProgress: 0
        }
    },
    (outboundState, key) => {
        return outboundState
    },
    {whitelist:['musicControl']}
)


const publicPersistConfig = {
    key: 'public',
    storage,
    whitelist: ['searchHistory']
}

const rootReducer = combineReducers({
    musicControl: musicControlSlice.reducer,
    musicList: musicListSlice.reducer,
    fmList: fmListSlice.reducer,
    user: userSlice.reducer,
    public: persistReducer(publicPersistConfig, publicSlice.reducer)
})

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: true
// })

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'musicList', 'musicControl'],
    transforms: [SetTransform]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer as typeof rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true
})

//持久化
const persistor = persistStore(store, {}, () => {
    changeMusic(0, false)
    musicInstance.init(store)
})

export type Store = typeof store

export type RootState = ReturnType<typeof store.getState> //返回当前state存储的变量类型

export default store

export { persistor }

