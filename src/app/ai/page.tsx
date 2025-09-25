"use client"

import Image from "next/image";
import style from "./style.module.css";
import BottomBar from "@/component/BottomBar";

export default function Ai() {
    return (
        <main className={style.container}>
            <div className={style.top}>
                <div className={style.title}>
                    What's do you need today ?
                </div>
            </div>
            <div className={style.mood}>
                <div className={style.moodImage} onClick={()=> console.log("energy boost")}>
                    <Image
                        src="https://i.pinimg.com/736x/01/31/5a/01315a661781b11cd5c65102b8a41940.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Energy Boost</h4>
                </div>
                <div className={style.moodImage} onClick={()=> console.log("chill")}>
                    <Image
                        src="https://i.pinimg.com/736x/86/f3/fe/86f3fe82587b8651b412189abba3c945.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Chill</h4>
                </div>
                <div className={style.moodImage} onClick={()=> console.log("inspiration")}>
                    <Image
                        src="https://i.pinimg.com/736x/83/a0/ca/83a0cab79b9bfdf26da6975f6630e115.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Inspiration</h4>
                </div>
                <div className={style.moodImage} onClick={()=> console.log("comfort")}>
                    <Image
                        src="https://i.pinimg.com/736x/19/d8/5e/19d85eb8e8b96ce9d2a2424a6e7fc78c.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Comfort</h4>
                </div>
                 <div className={style.moodImage} onClick={()=> console.log("melancholic")}>
                    <Image
                        src="https://i.pinimg.com/736x/42/2b/58/422b58ed2f1e5c671c3330cac9023d48.jpg"
                        width={1000}
                        height={1000}
                        alt="hero-image"
                        style={{ width: "100%", height: "100%", borderRadius: "1em" }}/>
                    <h4>Melancholic</h4>
                </div>
                 <div className={style.moodImage} onClick={()=> console.log("relax")}>
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