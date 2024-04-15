import { ReactElement } from "react";
import style from "./style.module.css";

export interface IButton {
    onClick?: () => void
    children: string | ReactElement
    className?: string
}
export default function Button({ onClick, children, className }: IButton) {
    return (
        <>
            {className ?
                <button onClick={onClick} className={className}>{children}</button> :
                <button onClick={onClick} className={style.button}>{children}</button>
            }
        </>
    )
}