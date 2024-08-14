"use client"

import Form from "@/component/Form";
import style from "./style.module.css";
import { useState } from "react";
import Button from "@/component/Button";
import { useAppDispatch } from "@/redux/hooks";
import { getUserDetail } from "@/redux/reducers/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [error, setError] = useState(false)

    const handleSignIn = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        const data = await result.json()

        const checkEmail = await data.find((d: any) => d.email === email)
        if (checkEmail) {
            const checkPass = await checkEmail.password === password
            if (checkPass) {
                await dispatch(getUserDetail(checkEmail.id))
                router.push("/home")
            } else {
                setError(true)
            }
        }
    }

    return (
        <main className={style.container}>
            <Form
                label="Email"
                type="text"
                placeholder="Input Email"
                value={email}
                onChange={(e: any) => {
                    setEmail(e.target.value);
                }}
                onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignIn()
                    }
                }}
            />
            <Form
                label="Password"
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e: any) => {
                    setPassword(e.target.value);
                }}
                onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignIn()
                    }
                }}
            />
            <Button onClick={() => handleSignIn()} active>Sign In</Button>
            {error ? <h6 style={{ "color": "white" }}>Invalid Email or Password</h6> : <></>}
            <h6 style={{ "color": "white" }}>Don't have account ? <Link href={"/register"} style={{ "color": "var(--third)" }}>Register</Link></h6>
        </main>
    )
}