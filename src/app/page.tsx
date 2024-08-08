"use client"

import Image from "next/image";
import styles from "./style.module.css";
import Button from "@/component/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const handleGoToSignInPage = () => [
    router.push("/signIn")
  ]

  return (
    <main className={styles.container}>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDxLxCkFmFJhpIwAn8Dr2UJ0gwlD8PedqjXzDV2EkRAM4yFK9zJE00Yipr5byh8AzGWM&usqp=CAU"
        width={1000}
        height={1000}
        alt="hero-image"
        style={{ width: "100%", height: "auto", borderRadius: "1em" }}
      />
      <div className={styles.title}>
        <div className={styles.title1}>
          Order Your
        </div>
        <div className={styles.title2}>
          Coffee
        </div>
      </div>
      <div className={styles.subtitles}>
        <p>Coffee Bean</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, necessitatibus atque consequuntur eius impedit vel maxime, corporis id aliquam cum qui, maiores ipsum tempora a labore amet ab aut dolorem.</p>
      </div>
      <Button onClick={() => handleGoToSignInPage} active>Get Started</Button>
    </main>
  );
}
