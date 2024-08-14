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
import { useRouter } from "next/navigation";

export default function Home() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const userDetail = user.user

    const [data, setData] = useState<ICoffee[]>([])

    const [text, setText] = useState("");
    const [dataFilter, setDataFilter] = useState("")

    const handleSearch = (e: string) => {
        setText(e)
    };

    const buttonFilter = ["All", "Americano", "Frappe", "Non Coffee", "Food", "Other"]
    const filter = (e: string) => {
        setDataFilter(e)
    }

    const getCoffeeLists = async () => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coffeeLists`);
            const res = await result.json()
            setData(res)

        } catch (error) {
            console.log(error)
        }
    }

    const getCoffeeListsByCategory = async () => {
        if (text) {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coffeeLists?itemName_like=${text}`);
                const res = await result.json()
                setData(res)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coffeeLists?category=${dataFilter}`);
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

    useEffect(() => {
        dispatch(getUserDetail(userDetail.id))
    }, [])

    const router = useRouter()
    useEffect(() => {
        if (!userDetail.id) {
            router.push("/signIn")
            return
        }
    }, [])

    if (!userDetail.id) return null

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
                    Hello, {userDetail.firstName}
                </div>
                <div className={style.subtitle}>
                    Taste the Difference, Feel the Love
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
                        />
                    )
                })}
            </div>
            <BottomBar />
        </main>
    )
}