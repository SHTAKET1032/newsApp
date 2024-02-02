import {Link} from "react-router-dom";
import {AppContext} from "../app/App";
import {useContext} from "react";
import style from './Card.module.scss'


export const Card = (item) => {


    const {
        displayOptions,
        readFullArticle,
        options
    } = useContext(AppContext)

    const {
        title,
        publishedAt,
        content,
        url
    } = item

    const obj = {title, publishedAt, content, url}


    return (
        <div className={style.newsCard}>
            {displayOptions.showTitle && <h3 className={style.newsTitle}>{`${title.slice(0, 100)}...`}</h3>}
            {displayOptions.showDate &&
                <p className={style.newsDate}>{new Date(publishedAt).toLocaleString('ru-RU', options)}</p>}
            {displayOptions.showText &&
                <p className={style.newsTxt}>{item.content ? `${content.slice(0, 200)}...` : 'Статья отсутствует'}</p>}


            <Link to="/fullArticle">
                <button
                    className={style.btnMore}
                    onClick={() => readFullArticle(obj)}>
                    Читать статью полностью
                </button>
            </Link>


        </div>
    )
}
