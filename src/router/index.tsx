import { lazy, Suspense } from 'react'
import { Navigate, Route, useLocation, useRoutes } from 'react-router-dom'
import Loading from '../components/Loading'
import MVList from '../pages/video/MvList'
import Video from '../pages/video'
import VideoList from '../pages/video/VideoList'
import MVDetail from '../pages/videoDetail/mv/index'
import VideoDetail from '../pages/videoDetail/video'
import store, { RootState } from '../redux/store'
import createLogin from '../components/login'
import { useSelector } from 'react-redux'
import UserDetail from '../pages/userDetail'
const Content = lazy(() => import('../Layout/DefaultLayout/content/index'))
const Home = lazy(() => import('../pages/Home'))
const MusicDetail = lazy(() => import('../Layout/DefaultLayout/musicDetail'))
const Suggest = lazy(() => import('../pages/Home/suggest'))
const SongSheets = lazy(() => import('../pages/Home/SongSheets'))
const HighQuality = lazy(() => import('../pages/HighQuality'))
const Rank = lazy(() => import('../pages/Home/rank'))
// 新增主播电台页面
const Anchor = lazy(() => import('../pages/Home/anchor/index'))
const PersonalFm = lazy(() => import('../pages/personalFm'))
const SongSheet = lazy(() => import('../pages/songSheet'))
const Album = lazy(() => import('../pages/album'))
const Artist = lazy(() => import('../pages/artist'))
const Search = lazy(() => import('../pages/search'))
const Artists = lazy(() => import('../pages/Home/artists'))
// const VideoDetail = lazy(() => import('../pages/videoDetail/v/VideoDetail'))


// requireAuth 要求授权（要求登录后才能跳转路由）
// function RequireAuth({ children }: { children: JSX.Element }) {
//     const userInfo = useSelector((state: RootState) => state.user.userInfo)
//     const location = useLocation()

//     if (!userInfo?.userId) {
//         // Redirect them to the /login page, but save the current location they were
//         // trying to go to when they were redirected. This allows us to send them
//         // along to that page after they login, which is a nicer user experience
//         // than dropping them off on the home page.
//         createLogin.create()
//     }

//     return children
// }

export const GetRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: (
                // 需要授权登录才能点击跳转的路由
                <Suspense>
                {/* 优化懒加载 */ }
                    <Suspense fallback={<Loading />}> 
                      < Content /> 
                     </Suspense > 
                </Suspense>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <Suspense fallback={<Loading />}>
                            {/* 四个跳转路由组件   // 个性推荐、歌单....*/}
                            <Home/>
                        </Suspense>
                    ),
                    children: [
                        {
                            path: '',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    {/* 个性推荐 */}
                                    <Suggest />
                                </Suspense>
                            )
                        },
                        {
                            path: 'songSheets',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <SongSheets />
                                </Suspense>
                            )
                        },
                        {
                            path: 'songSheets/default/',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <SongSheets />
                                </Suspense>
                            )
                        },
                        {
                            path: 'songSheets/default/:type',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <SongSheets />
                                </Suspense>
                            )
                        },
                        {
                            path: 'songSheets/highquality/:type',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <HighQuality />
                                </Suspense>
                            )
                        },
                        {
                            path: 'rank',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <Rank />
                                </Suspense>
                            )
                        },
                        {
                            path: 'artists',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <Artists />
                                </Suspense>
                            )
                        },
                        {
                            path: 'anchor',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <Anchor />
                                </Suspense>
                            )
                        },
                        {
                            path: 'anchor/:type',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <Anchor />
                                </Suspense>
                            )
                        },
                    ]
                },
                {
                    path: '/video',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Video />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: 'v',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <VideoList />
                                </Suspense>
                            )
                        },
                        {
                            path: 'mv',
                            element: (
                                <Suspense fallback={<Loading />}>
                                    <MVList />
                                </Suspense>
                            )
                        }
                    ]
                },
                {
                    path: '/personalFm',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <PersonalFm />
                        </Suspense>
                    )
                },
                {
                    path: '/songSheet/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <SongSheet />
                        </Suspense>
                    )
                },
                {
                    path: '/album/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Album />
                        </Suspense>
                    )
                },
                {
                    path: '/artist/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Artist />
                        </Suspense>
                    )
                },
                {
                    path: '/search/:keyword',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Search />
                        </Suspense>
                    )
                },
                {
                    path: 'user/me',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <UserDetail me />
                        </Suspense>
                    )
                },
                {
                    path: 'user/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <UserDetail />
                        </Suspense>
                    )
                }
            ]
        },
        {
            path: '/',
            element: (
                <Suspense fallback={<Loading />}>
                    <Content hiddenSideBar={true} />
                </Suspense>
            ),
            children: [
                {
                    path: '/videoDetail/v/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <VideoDetail />
                        </Suspense>
                    )
                },
                {
                    path: '/videoDetail/mv/:id',
                    element: (
                        <Suspense fallback={<Loading />}>
                            <MVDetail />
                        </Suspense>
                    )
                }
            ]
        }
    ])
    return routes
}