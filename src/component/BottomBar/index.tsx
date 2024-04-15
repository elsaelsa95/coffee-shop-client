"use client"

import { usePathname } from "next/navigation";
import style from "./style.module.css";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faHistory, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

export default function BottomBar({
    onClick,
}: {
    onClick?: MouseEventHandler;
}) {
    const pathname = usePathname()

    const navigationItems = [
        {
            title: "Home",
            icon: <FontAwesomeIcon icon={faHome} className={style.isActive} />,
            href: "/home",
            isActive: pathname === "/home",
        },
        {
            title: "Favorite",
            icon: <FontAwesomeIcon icon={faHeart} className={style.isActive} />,
            href: "/favorite",
            isActive: pathname === "/favorite",
        },
        {
            title: "History",
            icon: <FontAwesomeIcon icon={faHistory} className={style.isActive} />,
            href: "/history",
            isActive: pathname === "/history"
        },
        {
            title: "Cart",
            icon: <FontAwesomeIcon icon={faCartShopping} className={style.isActive} />,
            href: "/cart",
            isActive: pathname === "/cart"
        },
        {
            title: "Profile",
            icon: <FontAwesomeIcon icon={faUser} className={style.isActive} />,
            href: "/profile",
            isActive: pathname === "/profile"
        },
    ]
    return (
        <div
            className={style.navigationItems}
            data-pathname={pathname}
        >
            {navigationItems.map((item, i) => (
                <Link
                    key={i}
                    href={item.href}
                    title={item.title}
                    data-is-active={item.isActive}
                    onClick={onClick}
                >
                    {item.icon}
                </Link>
            ))}
        </div>
    )
}