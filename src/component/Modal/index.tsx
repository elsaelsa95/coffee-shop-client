import { ReactElement } from "react";
import style from "./style.module.css";

export interface IModal {
    children: string | ReactElement
    className?: string
}
export default function Modal({ children, className }: IModal) {
    return (
        <>
            {className ?
                <div className={className}>{children}</div> :
                <div className={style.modal}>{children}</div>
            }
        </>
    )
}