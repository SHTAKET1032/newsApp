import React from "react";
import axios from "axios"
import {Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {Card} from "../card/Card";
import {Article} from "../pages/article/Article";
import {Home} from "../pages/home/Home";
import './App.css'


export const AppContext = createContext({})


function App() {

    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [fullArticle, setFullArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState(3)
    const [sort, setSort] = useState(true)
    const [displayOptions, setDisplayOptions] = useState({
        showTitle: true,
        showDate: true,
        showText: true
    })

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)

                const dataResponse = await axios.get(`https://newsapi.org/v2/top-headlines?pageSize=${pages}&country=ru&apiKey=db28ec789a3945f281d87070a1d28362`)
                setData(dataResponse.data.articles)

                setLoading(false)

            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }

        getData()
    }, [pages])

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const readFullArticle = (obj) => {
        setFullArticle(obj)
    }

    const clearFullArticle = () => {
        setFullArticle({})
    }

    const filtredNews = data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    )


    const renderNews = () => {
        return (
            filtredNews.map((item, index) => (
                <Card
                    key={index}
                    {...item}
                />
            ))
        )
    }

    const onAddNews = () => {
        setPages(prevPages => prevPages + 3)
    }

    const changeSorting = () => {
        setSort(!sort)
        setData(data.reverse())
    }


    return (
        <div className="wrapper">

            <AppContext.Provider value={{
                displayOptions,
                setDisplayOptions,
                onChangeSearchInput,
                options,
                filtredNews,
                renderNews,
                readFullArticle,
                fullArticle,
                clearFullArticle,
                loading,
                onAddNews,
                sort,
                changeSorting
            }}>

                <Routes>

                    <Route path="/" exact
                           element={
                               <Home/>
                           }
                    />


                    <Route path="/fullArticle" exact
                           element={
                               <Article/>
                           }
                    />
                </Routes>
            </AppContext.Provider>


        </div>
    );
}

export default App;
