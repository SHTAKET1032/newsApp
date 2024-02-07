import {Link} from "react-router-dom";
import {AppContext} from "../app/App";
import {useContext} from "react";
import style from './Card.module.scss'
import ContentLoader from "react-content-loader";


export const Card = ({
                         item,
                         displayOptions,
                         loading,
                         title,
                         publishedAt,
                         content,
                         url
                     }) => {

    const {
        readFullArticle,
        options
    } = useContext(AppContext)


    // const {
    //     title,
    //     publishedAt,
    //     content,
    //     url
    // } = item


    const obj = {title, publishedAt, content, url}

    const timeOfPublished = new Date(publishedAt).toLocaleString('ru-RU', options)


    return (loading ? (
            <ContentLoader
                speed={10}
                width={950}
                height={70}
                viewBox="0 0 1000 70"
                backgroundColor="#ffffff"
                foregroundColor="#009dff"
            >
                <circle cx="829" cy="449" r="97"/>
                <rect x="0" y="0" rx="0" ry="0" width="1080" height="87"/>
            </ContentLoader>
        ) : (
            <div className={style.newsCard}>
                {displayOptions.showTitle && <h3 className={style.newsTitle}>{`${title.slice(0, 100)}...`}</h3>}
                {displayOptions.showDate &&
                    <p className={style.newsDate}>{timeOfPublished}</p>}
                {displayOptions.showText &&
                    <p className={style.newsTxt}>{content ? `${content.slice(0, 200)}...` : 'Статья отсутствует'}</p>}
                <Link to="/fullArticle">
                    <button
                        className={style.btnMore}
                        onClick={() => readFullArticle(obj)}>
                        Читать статью полностью
                    </button>
                </Link>
            </div>
        )
    )
}
