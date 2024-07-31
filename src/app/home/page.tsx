"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Form from "@/component/Form";
import Button from "@/component/Button";
import CardMenu from "@/component/CardMenu";
import { ICoffee } from "@/interfaces/Coffee";
import { getUserDetail, selectUser } from "@/redux/reducers/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(selectUser)

    useEffect(() => {
        dispatch(getUserDetail("fe553e06-0e52-4f13-9e50-b1f5feeed070"))
    }, [])

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

    const getCoffeeLists = async () => {
        try {
            const result = await fetch(`http://localhost:8000/coffeeLists`);
            const res = await result.json()
            setData(res)

        } catch (error) {
            console.log(error)
        }
    }

    const getCoffeeListsByCategory = async () => {
        if (text) {
            try {
                const result = await fetch(`http://localhost:8000/coffeeLists?category_like=${text}`);
                const res = await result.json()
                setData(res)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const result = await fetch(`http://localhost:8000/coffeeLists?category=${dataFilter}`);
                const res = await result.json()
                setData(res)

            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (text == "") {
            getCoffeeLists()
        }
        else {
            getCoffeeListsByCategory()
        }
    }, [text])

    useEffect(() => {
        if (dataFilter == "All" || dataFilter == "") {
            getCoffeeLists()
        } else {
            getCoffeeListsByCategory()
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
                    Hello, {userState.user?.firstName}
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