"use client"

import BottomBar from "@/component/BottomBar";
import style from "./style.module.css";
import Button from "@/component/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserDetail, selectUser } from "@/redux/reducers/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/User";
import Form from "@/component/Form";
import { useRouter } from "next/navigation";

export default function Profile() {
    const user = useAppSelector(selectUser)
    const userDetail = user.user

    const [curr, setCurr] = useState<IUser>(userDetail)

    const dispatch = useAppDispatch()
    const updateUserDetail = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: curr.firstName,
                    lastName: curr.lastName,
                    phoneNumber: curr.phoneNumber,
                    email: curr.email,
                    photoProfile: curr.photoProfile,
                    point: curr.point,
                    favorites: curr.favorites,
                    history: curr.history
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getUserDetail(userDetail.id))
    }, [])

    const router = useRouter()
    const handleSignOut = () => {
        router.push("/")
    }

    return (
        <main className={style.container}>
            <section className={style.photoProfile}>
                <Image width={100} height={100} alt={userDetail.firstName} src={userDetail.photoProfile} className={style.photo} />
            </section>
            <section className={style.userDetail}>
                <Form
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={curr.firstName}
                    onChange={(e: any) => {
                        setCurr({ ...curr, firstName: e.target.value })
                        e.preventDefault()
                    }}
                    onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateUserDetail(userDetail.id);
                        }
                    }} />

                <Form
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={curr.lastName}
                    onChange={(e: any) => {
                        setCurr({ ...curr, lastName: e.target.value })
                        e.preventDefault()
                    }}
                    onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateUserDetail(userDetail.id);
                        }
                    }} />

                <Form
                    label="Phone Number"
                    type="text"
                    placeholder="Phone Number"
                    value={curr.phoneNumber}
                    onChange={(e: any) => {
                        setCurr({ ...curr, phoneNumber: e.target.value })
                        e.preventDefault()
                    }}
                    onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateUserDetail(userDetail.id);
                        }
                    }} />

                <Form
                    label="Email"
                    type="text"
                    placeholder="Email"
                    value={curr.email}
                    onChange={(e: any) => {
                        setCurr({ ...curr, email: e.target.value })
                        e.preventDefault()
                    }}
                    onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateUserDetail(userDetail.id);
                        }
                    }} />
                <Form
                    label="Point"
                    type="text"
                    placeholder="Point"
                    value={curr.point}
                    disabled
                />
            </section>
            <Button active onClick={() => handleSignOut()}>Sign Out</Button>
            <BottomBar />
        </main>
    )
}