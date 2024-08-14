"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import Button from "@/component/Button";
import CardMenu from "@/component/CardMenu";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/reducers/user";
import { useEffect } from "react";

export default function Favorite() {
    const router = useRouter()
    const back = () => {
        router.push("/home")
    }

    const user = useAppSelector(selectUser)
    const userDetail = user.user
    const favorite = user.user.favorites

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
                <h1 className={style.title}>My Favorite</h1>
            </section>
            <section className={style.favorite}>
                {favorite ?
                    favorite.map((c) => {
                        return (
                            <CardMenu
                                key={c.id}
                                id={c.id}
                                image={c.image}
                                rating={c.rating}
                                name={c.itemName}
                            />
                        )
                    }) : <h1>No Data</h1>}
            </section>
            <BottomBar />
        </main>
    )
}