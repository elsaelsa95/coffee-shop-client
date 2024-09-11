"use client"

import Form from "@/component/Form";
import style from "./style.module.css"
import { useState } from "react";
import Button from "@/component/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleRegister = async () => {
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email or Password is Required",
                confirmButtonText: "Close",
                width: "20em"
            })
        } else {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            const data = await result.json()

            const checkEmail = data.find((d: any) => d.email === email)
            if (checkEmail) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email already used",
                    confirmButtonText: "Close",
                    width: "20em"
                })
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
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Account has been created",
                confirmButtonText: "Close",
                width: "20em"
            })
            router.push("/signIn")
            return response
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Close",
                width: "20em"
            })
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
            <h6 style={{ "color": "white" }}>Already have account ? <Link href={"/signIn"} style={{ "color": "var(--third)" }}>Sign In</Link></h6>
        </main>
    )
}