import { ReactElement } from "react";
import style from "./style.module.css";

export interface IButton {
    onClick?: () => void
    children: string | ReactElement
    className?: string
    active?: boolean
}
export default function Button({ onClick, children, className, active }: IButton) {
    return (
        <>
            {className ?
                <button onClick={onClick} className={className}>{children}</button> :
                active == true ?
                    <button onClick={onClick} className={style.button}>{children}</button> :
                    <button className={style.inActiveButton}>{children}</button>
            }
        </>
    )
}