// import {Link} from "react-router-dom";
// import {AppContext} from "../app/App";
// import {useContext} from "react";
// import style from './Card.module.scss'
// import {Loader} from "../loader/Loader";
//
//
// export const Card = ({
//                          item,
//                          displayOptions,
//                          loading,
//                          title,
//                          publishedAt,
//                          content,
//                          url
//                      }) => {
//
//     const {
//         readFullArticle,
//         options
//     } = useContext(AppContext)
//
//
//     // const {
//     //     title,
//     //     publishedAt,
//     //     content,
//     //     url
//     // } = item
//
//
//
//     const obj = {title, publishedAt, content, url}
//
//     const timeOfPublished = new Date(publishedAt).toLocaleString('ru-RU', options)
//
//
//     return (loading ?
//             <Loader/> :
//             (
//                 <div className={style.newsCard}>
//                     {displayOptions.showTitle && <h3 className={style.newsTitle}>{`${title.slice(0, 100)}...`}</h3>}
//                     {displayOptions.showDate &&
//                         <p className={style.newsDate}>{timeOfPublished}</p>}
//                     {displayOptions.showText &&
//                         <p className={style.newsTxt}>{content ? `${content.slice(0, 200)}...` : 'Статья отсутствует'}</p>}
//                     <Link to="/fullArticle">
//                         <button
//                             className={style.btnMore}
//                             onClick={() => readFullArticle(obj)}>
//                             Читать статью полностью
//                         </button>
//                     </Link>
//                 </div>
//             )
//     )
// }





import {Link} from "react-router-dom";
import {AppContext} from "../app/App";
import {useContext} from "react";
import {useInView} from "react-intersection-observer";
import style from './Card.module.scss'
import {Loader} from "../loader/Loader";


export const Card = ({
                         item,
                         displayOptions,
                         loading,
                         title,
                         publishedAt,
                         content,
                         url,
                         onAddNews
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

    const {ref, inView} = useInView({
        threshold: 0.5,
        triggerOnce: true
    })


    const obj = {title, publishedAt, content, url}

    const timeOfPublished = new Date(publishedAt).toLocaleString('ru-RU', options)


    return (loading ?
            <Loader/> : (
                <div ref={ref} className={style.newsCard}>
                    {inView ? (
                            <>
                                {displayOptions.showTitle &&
                                    <h3 className={style.newsTitle}>{`${title.slice(0, 100)}...`}</h3>}
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
                            </>
                        ) :
                        <Loader/>
                    }
                </div>
            )
    )
}
