import { ReactElement } from "react";
import style from "./style.module.css";

export interface ICard {
    children: string | ReactElement
    className?: string
}
export default function Card({ children, className }: ICard) {
    return (
        <>
            {className ?
                <div className={className}>{children}</div> :
                <div className={style.card}>{children}</div>
            }
        </>
    )
}