import { HeartOutlined } from "@ant-design/icons"
import '../../../assets/iconfont/iconfont.css'
import style from './index.module.css'
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAnchorRecommend } from "./hooks/useAnchorRecommend"
import ListType from './type'

interface AnchorProps{}
interface anchorCategoryType{
    id:number,
    className: string,
    title: String,
    path: String
    active : boolean
}

const Anchor: FC<AnchorProps> = () => {
    let anchorCategory : anchorCategoryType[] = [
        {
            id:1,
            className: "iconfont icon-qingganganqing",
            title: "情感",
            path: "/情感",
            active: true,
        },
        {
            id: 2,
            className: "iconfont icon-icon-",
            title: "音乐推荐",
            path: "/音乐推荐",
            active: false,
        },
        {
            id:3,
            className: "iconfont icon-book",
            title: "有声书",
            path: "/有声书",
            active: false,
        },
        {
            id:4,
            className: "iconfont icon-MikeOutline",
            title: "创作翻唱",
            path: "/创作翻唱",
            active: false,
        },
        {
            id:5,
            className: "iconfont icon-zhishi",
            title: "知识",
            path: "/知识",
            active: false,
        },
        {
            id:6,
            className: "iconfont icon-shenghuo",
            title: "生活",
            path: "/生活",
            active: false,
        },
        {
            id:7,
            className: "iconfont icon-airudiantubiaohuizhi-zhuanqu_qinzichengchang",
            title: "亲子",
            path: "/亲子",
            active: false,
        },
        {
            id:8,
            className: "iconfont icon-24gl-newspaper4",
            title: "新闻资讯",
            path: "/新闻资讯",
            active: false,
        },
        {
            id:9,
            className: "iconfont icon-guangbo",
            title: "广播剧",
            path: "/广播剧",
            active: false,
        },
        {
            id:10,
            className: "iconfont icon-chuanmeiyule",
            title: "娱乐",
            path: "/娱乐",
            active: false,
        },
        {
            id: 11,
            className: "iconfont icon-shanzibaijian",
            title: "相声",
            path: "/相声",
            active: false,
        },
        {
            id: 12,
            className: "iconfont icon-qita",
            title: "其他",
            path: "/其他",
            active: false,
        }
    ]
    const navigate = useNavigate();
    const handleTopath = (path:String) => {
        navigate(`/anchor${path}`);
    }
    const [anchorRecommendList, setRecommenList] = useState<ListType[]>([]);
    // 点击新的分类后，更新推荐内容
        // const res = useAnchorRecommend();
        // setRecommenList(res);

    //   const changeActive = (id:Number) => {
    //     anchorCategory.map((item) => {
    //         item.active = false;
    //         if (item.id === id)
    //             item.active = true;
    //     })
    // }
    let [activeId,setActiveId] = useState(1);
    return (
        <div className="content1001">
            {/* 头部分类导航栏模块 */}
            <div className="anchor-header">
                <div className={style.icon}>
                    {
                        anchorCategory.map((item) => {
                            return <div className={style.iconbox} onClick={() => { handleTopath(item.path); setActiveId(item.id)} }>
                                <div className={item.className} style={ item.id === activeId ?{color: 'red' } : {}}></div>
                                <div className={item.id === activeId ? style.actIntro : style.intro}>{item.title}</div>
                            </div>
                        })
                    }
                   
                </div> 
            </div>
            {/* 推荐 [优秀新电台] 部分 */}
            <div className={style.goodnew}>
                <div className={ style.module1 }>
                    优秀新电台
                </div>
                <div className={style.line}></div>
            </div>
        </div>
    )
}

export default Anchor