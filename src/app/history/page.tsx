"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import Button from "@/component/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/reducers/user";
import Card from "@/component/Card";
import { useState } from "react";
import { IHistory } from "@/interfaces/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";


export default function History() {
    const userState = useAppSelector(selectUser)
    const history = userState.user.history

    const router = useRouter()
    const back = () => {
        router.push("/home")
    }

    const [openModal, setOpenModal] = useState(false)
    const [detail, setDetail] = useState<IHistory>()

    const openDetail = (id: string) => {
        setOpenModal(!openModal)
        const filterHistory = history.find((h) => h.idHistory === id)
        setDetail(filterHistory)
    }

    const closeDetail = () => {
        setOpenModal(!openModal)
    }

    return (
        <main className={style.container}>
            <section className={style.backBar}>
                <Button className={style.backButton} onClick={() => back()}> Back </Button>
                <h1 className={style.title}>My History</h1>
            </section>
            <section className={style.history}>
                {history.map((h, i) => {
                    return (
                        <Card className={style.historyCard} key={i}>
                            <>
                                <div>
                                    <div> Date: {h.date}</div>
                                    <div> Total Purchase: $ {h.total}</div>
                                    <div> Get Point: $ {h.getPoint}</div>
                                </div>
                                <div>
                                    <p>Completed</p>
                                    <Button className={style.detail} onClick={() => openDetail(h.idHistory)}>Detail</Button>
                                </div>
                            </>
                        </Card>
                    )
                })}
            </section>
            {openModal && detail ?
                <div className={style.modal}>
                    <FontAwesomeIcon icon={faClose} onClick={() => closeDetail()} style={{ "alignSelf": "end" }} />
                    <div>
                        <p>Invoice ID: {detail.idHistory}</p>
                        <p>Date: {detail.date}</p>
                    </div>
                    {detail.description.map((d, i) => {
                        return (
                            <div key={i}>
                                <div className={style.description}>
                                    <p>{d.itemName}</p>
                                    <p>{d.itemSize}</p>
                                </div>
                                <div className={style.price}>
                                    <p>$ {d.itemPrice}</p> x <p>{d.quantity}</p> = <p>$ {d.totalPrice}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className={style.total}>
                        <p>Subtotal</p>
                        <p>$ {detail.subtotal}</p>
                        <p>Redeem Point</p>
                        <p>$ {detail.redeemPoint}</p>
                        <p>Total Purchase </p>
                        <p>$ {detail.total}</p>
                        <p>Get Point</p>
                        <p>$ {detail.getPoint}</p>
                    </div>
                    <p style={{ "textAlign": "center" }}>===== Thank You =====</p>
                </div>
                : <></>}
            <BottomBar />
        </main>

    )
}