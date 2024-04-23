import Card from "../Card";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import Image from "next/image";

export default function CardMenu() {
    return (
        <div className={style.border}>
            <div className={style.image}>
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6zk7z7oGEhgivW4qRotFp8APLTfb_Yq-OgMExdHhRtXFxMyBBtT_Ik4vYqD4Ga-gxTA&usqp=CAU"
                    width={1000}
                    height={1000}
                    alt="image"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "20px"
                    }}
                />
            </div>
            <Card className={style.card}>
                <div>
                    <div className={style.top}>
                        <div className={style.rating}>
                            <small>
                                Rating this drink 4.5 <FontAwesomeIcon icon={faStar} />
                            </small>
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <div>
                            <p><strong>Espresso</strong></p>
                            <small>With Milk</small>
                        </div>
                        <Button className={style.button}><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                </div>
            </Card>
        </div >
    )
}