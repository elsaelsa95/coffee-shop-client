import { ReactElement } from "react";
import style from "./style.module.css";

export interface ICard {
    onClick?: () => void
    children: string | ReactElement
    className?: string
}
export default function Card({ onClick, children, className }: ICard) {
    return (
        <>
            {className ?
                <button onClick={onClick} className={className}>{children}</button> :
                <button onClick={onClick} className={style.card}>{children}</button>
            }
        </>
    )
}