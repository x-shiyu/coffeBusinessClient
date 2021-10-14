import React from "react";
import style from './style.module.css'

export default function DetailHeader({ title }: { title: string }) {
    return (
        <header className={style.detailHeader}>
            {title}
        </header>
    )
}