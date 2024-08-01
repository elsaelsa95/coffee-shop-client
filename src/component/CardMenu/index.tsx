import Card from "../Card";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ICardMenu {
    id: string;
    image: string;
    rating: number;
    name: string;
    description: string
}
export default function CardMenu({ id, image, rating, name, description }: ICardMenu) {
    const router = useRouter()
    const detail = () => {
        router.push(`home/${id}`)
    }

    return (
        <div className={style.border}>
            <div className={style.image}>
                <Image
                    src={image}
                    width={1000}
                    height={1000}
                    alt="image"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "20px"
                    }}
                    placeholder="empty"
                    priority
                />
            </div>
            <Card className={style.card}>
                <div>
                    <div className={style.top}>
                        <div className={style.rating}>
                            <small>
                                Rating {rating} <FontAwesomeIcon icon={faStar} />
                            </small>
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <div>
                            <p><strong>{name}</strong></p>
                            <small>{description}</small>
                        </div>
                        <Button className={style.button} onClick={() => detail()}><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                </div>
            </Card>
        </div >
    )
}