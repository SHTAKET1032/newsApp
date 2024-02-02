import React, {useContext} from "react";
import {AppContext} from "../../app/App";
import {Header} from "../../header/Header";
import {Loader} from "../../loader/Loader";
import style from "./Home.module.scss"


export const Home = () => {

    const {
        filtredNews,
        renderNews,
        loading,
        onAddNews
    } = useContext(AppContext)

    return (
        <>
            <Header/>
            <>
                {loading ?
                    <>
                        <Loader/>
                        <Loader/>
                        <Loader/>
                    </> :
                    filtredNews.length === 0 ?
                        <h2>Ничего не найдено. Попробуйте другой запрос.</h2> :
                        renderNews()}
            </>

            <button
                className={style.btnMore}
                onClick={() => onAddNews()}>
                Ещё новости
            </button>
        </>
    )
}
