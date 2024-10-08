"use client"

import { useParams, useRouter } from "next/navigation";
import style from "./style.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@/component/Button";
import { useEffect, useState } from "react";
import { ICoffee } from "@/interfaces/Coffee";
import { useAppDispatch } from "@/redux/hooks";
import { updateCart } from "@/redux/reducers/cart";

export default function Detail() {
    const router = useRouter()
    const back = () => {
        router.push("/home")
    }

    const params = useParams()
    const [detail, setDetail] = useState<ICoffee>()

    const getCoffeeDetail = async () => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coffeeLists/${params.id}`);
            const res = await result.json()
            setDetail(res)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCoffeeDetail()
    }, [getCoffeeDetail])


    const [itemSize, setItemSize] = useState("")
    const [basicPrice, setBasicPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    const changeBasicPrice = (size: any) => {
        const findSize = detail!.price.find((x) => x.size == size)
        setBasicPrice(findSize!.price)
        setItemSize(findSize!.size)
    }

    const minus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
        else {
            setQuantity(0)
        }
    }
    const plus = () => {
        setQuantity(quantity + 1)
    }

    const sumPrize = () => {
        setPrice(basicPrice * quantity)
    }

    useEffect(() => {
        sumPrize()
    })

    const dispatch = useAppDispatch()

    const handleAddToChart = () => {
        back()
        dispatch(updateCart(
            {
                itemId: detail?.id,
                itemName: detail?.itemName,
                itemImage: detail?.image,
                itemSize: itemSize,
                itemPrice: basicPrice,
                quantity: quantity,
                totalPrice: price
            }))
    }

    return (
        <main className={style.container}>
            <Button className={style.backButton} onClick={() => back()}> Back </Button>
            {detail ?
                <>
                    <Image
                        src={detail.image}
                        width={1000}
                        height={1000}
                        alt="image"
                        style={{
                            width: "100%",
                            minHeight: "10em",
                            maxHeight: "30em",
                            background: "var(--first)"
                        }}
                    />
                    <div className={style.detail}>
                        <div className={style.title}>
                            <p><strong>{detail.itemName}</strong></p>
                            {/* <FontAwesomeIcon icon={faHeart} /> */}
                        </div>
                        <small className={style.rating}>
                            <FontAwesomeIcon icon={faStar} /> <p className={style.subtitle}>{detail.rating} (530)</p>
                        </small>
                        <section className={style.top}>
                            <small><strong>Description</strong></small>
                            <small className={style.subtitle}>{detail.description}</small>
                        </section>
                        <section className={style.bottom}>
                            <small><strong>Size</strong></small>
                            <div className={style.size}>
                                {detail.price.map((b) => {
                                    return (
                                        itemSize == b.size ?
                                            <Button className={style.buttonListActive} key={b.size} onClick={() => changeBasicPrice(b.size)}>{b.size}</Button> :
                                            <Button className={style.buttonList} key={b.size} onClick={() => changeBasicPrice(b.size)}>{b.size}</Button>
                                    )
                                })}
                            </div>
                            <div className={style.quantity}>
                                <small><strong>Quantity</strong></small>
                                <div className={style.quantity}>
                                    <Button className={style.button} onClick={() => minus()}>-</Button>
                                    <small>{quantity}</small>
                                    <Button className={style.button} onClick={() => plus()}>+</Button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className={style.add}>
                        <div>
                            <small className={style.subtitle}>Price</small>
                            <p className={style.price}>$ {price}</p>
                        </div>
                        {price ?
                            <Button onClick={() => handleAddToChart()} active={true}>Add to cart</Button>
                            : <Button active={false}>Add to cart</Button>}
                    </div>
                </>
                : <p>Error</p>
            }
        </main>
    )
}