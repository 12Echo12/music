import { FC } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from './Toast.module.css'

const Toast: FC = () => {
    return (
        <div className={style.toast}>
            <TransitionGroup>
                {queue.map((el) => (
                    <CSSTransition key={el._tid} classNames='slide' timeout={500}>
                        <div
                            className={`${style.item} ${style[el.type]}`}
                            onClick={() => globalControl.rm(el._tid)}
                        >
                            <div className={`${style.itemContent}`}>{el.message}</div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}