"use client"

import Image from "next/image";
import style from "./style.module.css";
import BottomBar from "@/component/BottomBar";
import { useState } from "react";
import { getCafeRecomendation } from "@/mastra/action";
import Modal from "@/component/Modal";

export default function Ai() {
    const [result, setResult] = useState<string | null>(null);
    const [modalAi, setModalAi] = useState(false);
    const [loading, setLoading] = useState(false)

    async function handleSubmit(need: string) {
        setLoading(true);
        setModalAi(true)

        const res = await getCafeRecomendation(need);
        
        setResult(res)
        if (result) {
            setLoading(false)
        }
    }

    async function closeModal(){
        setResult(null)
        setLoading(false)
        setModalAi(false)
    }

    console.log(result)
    return (
        <main className={style.container}>
            <div className={style.top}>
                <div className={style.title}>
                    What do you need today ?
                </div>
            </div>
            {result ?
             <Modal> 
                <div className={style.modal}>
                    <div className={style.closeModal} onClick={()=>closeModal()}>X</div>
                    <div className={style.point}>{result}</div>
                </div>
            </Modal> : loading ?
            <Modal>
                <div className={style.modal}>
                    <div className={style.closeModal} onClick={()=>closeModal()}>X</div>
                    <div className={style.point}>Loading</div>
                </div>
            </Modal> : <></>}
            <div className={style.mood}>
                <div className={style.moodImage} onClick={()=> handleSubmit("energy boost")}>
                    <Image
                        src="https://i.pinimg.com/736x/01/31/5a/01315a661781b11cd5c65102b8a41940.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Energy Boost</h4>
                </div>
                <div className={style.moodImage} onClick={()=> handleSubmit("chill")}>
                    <Image
                        src="https://i.pinimg.com/736x/86/f3/fe/86f3fe82587b8651b412189abba3c945.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Chill</h4>
                </div>
                <div className={style.moodImage} onClick={()=> handleSubmit("inspiration")}>
                    <Image
                        src="https://i.pinimg.com/736x/83/a0/ca/83a0cab79b9bfdf26da6975f6630e115.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Inspiration</h4>
                </div>
                <div className={style.moodImage} onClick={()=> handleSubmit("comfort")}>
                    <Image
                        src="https://i.pinimg.com/736x/19/d8/5e/19d85eb8e8b96ce9d2a2424a6e7fc78c.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Comfort</h4>
                </div>
                 <div className={style.moodImage} onClick={()=> handleSubmit("melancholic")}>
                    <Image
                        src="https://i.pinimg.com/736x/42/2b/58/422b58ed2f1e5c671c3330cac9023d48.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Melancholic</h4>
                </div>
                 <div className={style.moodImage} onClick={()=> handleSubmit("relax")}>
                    <Image
                        src="https://i.pinimg.com/originals/37/68/15/3768158c7c1a73cd99f6728ebda201b2.png"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Relax</h4>
                </div>
            </div>
            <BottomBar />
        </main>
    )
}