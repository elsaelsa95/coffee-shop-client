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

    const handleRegister = () => {
        const result = fetch(`http://localhost:8000/users`)
        result
            .then((res) => res.json())
            .then((data) => {
                const checkEmail = data.find((d: any) => d.email === email)
                if (checkEmail) {
                    setError(true)
                } else {
                    createUser()
                }
            })
    }

    const createUser = async () => {
        try {
            const id = (Math.random() + 1).toString(36).substring(4);
            const response = await fetch(`http://localhost:8000/users`, {
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
                    "photoProfile": "",
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
            />
            <Form
                label="Password"
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e: any) => {
                    setPassword(e.target.value);
                }}
            />
            <Button onClick={() => handleRegister()} active>Register</Button>
            {error ? <h6 style={{ "color": "white" }}>Email already used</h6> : <></>}
            <h6 style={{ "color": "white" }}>Already have account ? <Link href={"/signIn"} style={{ "color": "var(--third)" }}>Sign In</Link></h6>
        </main>
    )
}