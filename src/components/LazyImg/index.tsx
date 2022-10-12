import { FC, useEffect, useRef } from "react"
import lazyLoadGif from '../../assets/img/lazyLoad.gif'

interface LazyLoadProps {
    placeholder?: React.ReactNode
    src: string
    className?: string
    threshold?: number
}

const defaults = {
    placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    threshold: 0
}

const LazyImg: FC<LazyLoadProps> = (props) => {
    //合并默认值并取出
    const { placeholder, src } = { ...defaults, ...props }

    // 用来访问 DOM 节点
    const elementRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        // 创建 intersectionobserver 对象！！！
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // 相交了就不再监听了！！！
                if (entry.isIntersecting) {
                    // 获得 DOM 节点
                    const image = entry.target as HTMLImageElement
                    // 如果相交就改变 img 的 src 为要加载的！！！
                    image.src = src
                    observer.unobserve(image)
                }
            })
        })
        if (elementRef.current) {
            observer.observe(elementRef.current)
        }
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])
    return <img ref={elementRef} src={lazyLoadGif}></img>
}

export default LazyImg