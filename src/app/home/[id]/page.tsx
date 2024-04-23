"use client"

import { useParams } from "next/navigation";
import style from "./style.module.css";
import { DataCoffee } from "@/data/coffee";
import CardMenu from "@/component/CardMenu";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@/component/Button";

export default function Detail() {
    const params = useParams()
    const detail = DataCoffee.find((c) => c.id == params.id)

    const buttonSize = ["Small", "Medium", "Large"]

    return (
        <main className={style.container}>
            {detail ?
                <>
                    <Image
                        src={detail.image}
                        width={1000}
                        height={1000}
                        alt="image"
                        style={{
                            width: "100%",
                            height: "auto"
                        }}
                    />
                    <div className={style.detail}>
                        <div className={style.title}>
                            <p><strong>{detail.itemName}</strong></p>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <small className={style.subtitle}>{detail.description}</small>
                        <small className={style.rating}>
                            <FontAwesomeIcon icon={faStar} /> <p className={style.subtitle}>{detail.rating} (530)</p>
                        </small>
                        <small><strong>Description</strong></small>
                        <small className={style.subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit sit aliquid dolor nobis explicabo debitis repellendus placeat velit cum unde suscipit temporibus maxime provident, blanditiis iusto ullam ab repudiandae modi nihil aliquam facilis doloremque ducimus totam. Ducimus itaque inventore mollitia aliquid, laborum iure temporibus laudantium ea, assumenda exercitationem quis?</small>
                        <div className={style.quantity}>
                            <small><strong>Quantity</strong></small>
                            <div className={style.quantity}>
                                <Button className={style.button}>-</Button>
                                <small>1</small>
                                <Button className={style.button}>+</Button>
                            </div>
                        </div>
                        <small><strong>Size</strong></small>
                        <div className={style.size}>
                            {buttonSize.map((b) => {
                                return (
                                    <Button className={style.buttonList} key={b}>{b}</Button>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.add}>
                        <div>
                            <small className={style.subtitle}>Price</small>
                            <p className={style.price}>$ 4.56</p>
                        </div>
                        <Button>Add to cart</Button>
                    </div>
                </>
                : <p>Error</p>
            }
        </main>
    )
}