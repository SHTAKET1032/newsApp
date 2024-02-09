import React, {useEffect, useState} from "react";
import {HomeHeader} from "../../homeHeader/HomeHeader";
import style from "./Home.module.scss"
import axios from "axios";
import {Card} from "../../card/Card";


export const Home = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState(4)
    const [sort, setSort] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [displayOptions, setDisplayOptions] = useState({
        showTitle: true,
        showDate: true,
        showText: true
    })


    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)

                const dataResponse = await axios.get(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=db28ec789a3945f281d87070a1d28362`)
                setData(dataResponse.data.articles)
                console.log("из эфекта", data)

                setLoading(false)

            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }

        getData()
    }, [pages])



    const renderNews = () => {
        return (
            (loading ? [...Array(pages)] : filtredNews).map((item, index) => (
                <Card
                    key={index}
                    {...item}
                    displayOptions={displayOptions}
                    loading={loading}
                    onAddNews={onAddNews}
                />
            ))
        )
    }

    const filtredNews = data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    const onAddNews = () => {
        setPages(prevPages => prevPages + 3)
    }

    const changeSorting = () => {
        setSort(!sort)
        setData([...data].reverse())
    }


    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }


    return (
        <>
            <HomeHeader
                changeSorting={changeSorting}
                sort={sort}
                onChangeSearchInput={onChangeSearchInput}
                displayOptions={displayOptions}
                setDisplayOptions={setDisplayOptions}/>
            <>
                {renderNews()}
            </>

            {/*<button*/}
            {/*    className={style.btnMore}*/}
            {/*    onClick={() => onAddNews()}>*/}
            {/*    Ещё новости*/}
            {/*</button>*/}

            <h4 className={style.itsAll}>Вы ознакомились со всеми новостями.</h4>
        </>
    )
}
