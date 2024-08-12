"use client"

import Form from "@/component/Form";
import style from "./style.module.css";
import { useState } from "react";
import Button from "@/component/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserDetail, selectUser } from "@/redux/reducers/user";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [error, setError] = useState(false)

    const handleSignIn = () => {
        const result = fetch(`http://localhost:8000/users`)
        result
            .then((res) => res.json())
            .then((data) => {
                const checkEmail = data.find((d: any) => d.email === email)
                if (checkEmail) {
                    const checkPass = checkEmail.password === password
                    if (checkPass) {
                        dispatch(getUserDetail(checkEmail.id))
                        router.push("/home")
                    } else {
                        setError(true)
                    }
                } else {
                    setError(true)
                }
            })
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
        </main>
    )
}