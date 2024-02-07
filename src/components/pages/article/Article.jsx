import {Link} from "react-router-dom";
import {AppContext} from "../../app/App";
import {useContext} from "react";
import style from "./Article.module.scss";


export const Article = () => {

    const {
        fullArticle,
        clearFullArticle,
        options
    } = useContext(AppContext);

    const {
        title,
        publishedAt,
        content,
        url
    } = fullArticle;

    const timeOfPublished = new Date(publishedAt).toLocaleString('ru-RU', options)


    return (
        <>
            <div className={style.top}>
                <Link to="/">
                    <button
                        className={style.btnBack}
                        onClick={() => clearFullArticle()}>
                        К списку новостей
                    </button>
                </Link>
                <h3>{title}</h3>
                <a
                    className={style.link}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer">
                    Читать в источнике
                </a>
                <p>{timeOfPublished}</p>
            </div>
            <div className={style.content}>
                {content !== null ? content : <h2>Статья отсутствует</h2>}
            </div>

        </>
    )
}
