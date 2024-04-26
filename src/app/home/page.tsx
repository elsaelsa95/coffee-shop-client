"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Form from "@/component/Form";
import Button from "@/component/Button";
import CardMenu from "@/component/CardMenu";
import { DataCoffee } from "@/data/coffee";
import { ICoffee } from "@/interfaces/Coffee";

export default function Home() {
    const [data, setData] = useState<ICoffee[]>([])

    const [text, setText] = useState("");
    const [dataFilter, setDataFilter] = useState("")

    const handleSearch = (e: string) => {
        setText(e)
    };

    const buttonFilter = ["All", "Espresso", "Cappucino", "Frappucino", "Latte"]
    const filter = (e: string) => {
        setDataFilter(e)
    }

    useEffect(() => {
        if (text == "") {
            setData(DataCoffee)
        }
        else {
            setData(DataCoffee.filter((c: any) => c.itemName.toLowerCase().includes(text) || c.category.toLowerCase().includes(text)))
        }
    }, [text])

    useEffect(() => {
        if (dataFilter == "All" || dataFilter == "") {
            setData(DataCoffee)
        } else {
            setData(DataCoffee.filter((d) => d.category == dataFilter))
        }
    }, [dataFilter])

    return (
        <main className={style.container}>
            <div className={style.top}>
                <Form
                    label=""
                    type="text"
                    placeholder="Search a coffee.."
                    value={text}
                    onChange={(e: any) => {
                        setText(e.target.value);
                    }}
                    onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch(text);
                        }
                    }}
                />
                <div className={style.title}>
                    Good Morning
                </div>
                <div className={style.subtitle}>
                    Grab your first coffee in the morning
                </div>
            </div>
            <div className={style.buttonGroup}>
                {buttonFilter.map((b) => {
                    return (
                        <Button className={style.buttonList} onClick={() => filter(b)} key={b}>{b}</Button>
                    )
                })}
            </div>
            <div className={style.list}>
                {data.map((c) => {
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
                })}
            </div>
            <BottomBar />
        </main>
    )
}