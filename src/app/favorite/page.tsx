"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import Button from "@/component/Button";
import CardMenu from "@/component/CardMenu";
import { DataCoffee } from "@/data/coffee";
import { useRouter } from "next/navigation";

export default function Favorite() {
    const router = useRouter()
    const back = () => {
        router.push("/home")
    }
    return (
        <main className={style.container}>
            <section className={style.backBar}>
                <Button className={style.backButton} onClick={() => back()}> Back </Button>
                <h1 className={style.title}>My Favorite</h1>
            </section>
            <section className={style.favorite}>
                {DataCoffee ?
                    DataCoffee.map((c) => {
                        return (
                            <CardMenu
                                key={c.id}
                                id={c.id}
                                image={c.image}
                                rating={c.rating}
                                name={c.itemName}
                                description={c.topping}
                            />
                        )
                    }) : <h1>No Data</h1>}
            </section>
            <BottomBar />
        </main>
    )
}