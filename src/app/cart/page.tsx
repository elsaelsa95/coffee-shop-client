"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { deleteCart, selectCart } from "@/redux/reducers/cart"
import Button from "@/component/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { selectUser } from "@/redux/reducers/user";

export default function Cart() {
    const router = useRouter()
    const back = () => {
        router.push("/home")
    }

    const cart = useAppSelector(selectCart)
    const cartList = cart.cart
    const user = useAppSelector(selectUser)
    const userDetail = user.user

    let subtotal = 0

    for (let i = 0; i < cart.cart.length; i++) {
        subtotal += cart.cart[i].totalPrice
    }

    const [point, setPoint] = useState(0)
    const minus = () => {
        if (point > 1) {
            setPoint(point - 1)
        }
        else {
            setPoint(0)
        }
    }

    const plus = () => {
        if (point < Math.floor(userDetail.point) && point < subtotal) {
            setPoint(point + 1)
        }
        else (
            setPoint(point + 0)
        )
    }

    const totalPurchase = subtotal - point
    const getPoint = Number((subtotal / 9).toFixed(1))

    let newHistory: {}
    let currentPoint: number

    const dispatch = useAppDispatch()
    const payment = () => {
        const id = (Math.random() + 1).toString(36).substring(4);
        newHistory = {
            idHistory: id,
            date: new Date(),
            description: cartList,
            subtotal: subtotal,
            redeemPoint: point,
            total: totalPurchase,
            getPoint: getPoint
        }
        currentPoint = Number((userDetail.point - point + getPoint).toFixed(1))

        updateUserDetail(userDetail.id)
        dispatch(deleteCart())
        back()
    }

    const updateUserDetail = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    point: currentPoint,
                    history: [
                        ...userDetail.history,
                        newHistory
                    ]
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userDetail.id) {
            router.push("/signIn")
            return
        }
    }, [router, userDetail.id])

    if (!userDetail.id) return null

    return (
        <main className={style.container}>
            <section className={style.backBar}>
                <Button className={style.backButton} onClick={() => back()}> Back </Button>
                <h1 className={style.title}>My Cart</h1>
            </section>
            <section className={style.cart}>
                {cartList && cartList.length ? cartList.map((c, i) => {
                    return (
                        <div key={i} className={style.cartList}>
                            <Image width={100} height={100} src={c.itemImage} alt={c.itemName} priority />
                            <p>{c.quantity}x</p>
                            <div className={style.detail}>
                                <p>{c.itemName}</p>
                                <p>{c.itemSize}</p>
                            </div>
                            <p>${c.totalPrice}</p>
                        </div>
                    )
                }) : <div className={style.empty}>Empty</div>}
            </section>
            <section className={style.checkout}>
                <div className={style.grid}>
                    <p>Subtotal:</p>
                    <p>${subtotal}</p>
                    <p>Redeem Point:</p>
                    <div className={style.point}>
                        <Button className={style.buttonPoint} onClick={() => minus()}>-</Button>
                        <small>{point}</small>
                        <Button className={style.buttonPoint} onClick={() => plus()}>+</Button>
                    </div>
                    <p className={style.note}>*Avaiable Point:{userDetail.point}</p>
                    <br />
                    <p>Total Purchase:</p>
                    <p>${totalPurchase}</p>
                    <p>Get Point:</p>
                    <p>{getPoint}</p>
                </div>
                {totalPurchase >= 0 ? <Button className={style.button} onClick={() => payment()}>Payment</Button> :
                    <Button className={style.inActiveButton}>Payment</Button>
                }
            </section>
            <BottomBar />
        </main>
    )
}