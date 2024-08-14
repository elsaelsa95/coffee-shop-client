"use client"

import Form from "@/component/Form";
import style from "./style.module.css"
import { useState } from "react";
import Button from "@/component/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const router = useRouter()

    const [error, setError] = useState(false)
    const [errorEmpty, setErrorEmpty] = useState(false)

    const handleRegister = async () => {
        if (!email || !password) {
            setErrorEmpty(true)
        } else {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            const data = await result.json()

            const checkEmail = data.find((d: any) => d.email === email)
            if (checkEmail) {
                setError(true)
            } else {
                createUser()
            }
        }
    }

    const createUser = async () => {
        try {
            const id = (Math.random() + 1).toString(36).substring(4);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": id,
                    "firstName": "",
                    "lastName": "",
                    "phoneNumber": "",
                    "email": email,
                    "password": password,
                    "photoProfile": "/image/coffee.jpeg",
                    "point": 0,
                    "favorites": [],
                    "history": []
                })
            })
            router.push("/signIn")
            return response
        } catch (error) {
            console.log(error)
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
                        handleRegister()
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
                        handleRegister()
                    }
                }}
            />
            <Button onClick={() => handleRegister()} active>Register</Button>
            {error ? <h6 style={{ "color": "white" }}>Email already used</h6> : <></>}
            {errorEmpty ? <h6 style={{ "color": "white" }}>Email or Password is Required</h6> : <></>}
            <h6 style={{ "color": "white" }}>Already have account ? <Link href={"/signIn"} style={{ "color": "var(--third)" }}>Sign In</Link></h6>
        </main>
    )
}