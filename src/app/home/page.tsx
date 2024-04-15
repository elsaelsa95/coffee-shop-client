"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import { useState } from "react";
import Form from "@/component/Form";
import Button from "@/component/Button";
import CardMenu from "@/component/CardMenu";

export default function Home() {
    const [text, setText] = useState("");

    const handleSearch = (e: any) => {
        console.log(e)
    };
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
                <div className={style.middle}>
                    Today&apos;s Deal
                    <CardMenu />
                </div>
            </div>
            <div className={style.buttonGroup}>
                <Button>Espresso</Button>
                <Button>Cappuccino</Button>
                <Button>Frappuccino</Button>
                <Button>Latte</Button>
            </div>
            <div className={style.list}>
                <CardMenu />
                <CardMenu />
                <CardMenu />
                <CardMenu />
            </div>
            <BottomBar />
        </main>
    )
}