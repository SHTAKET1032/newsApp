import React from "react";
import {Route, Routes} from "react-router-dom";
import {createContext, useState} from "react";
import {Article} from "../pages/article/Article";
import {Home} from "../pages/home/Home";
import './App.css'


export const AppContext = createContext({})


function App() {


    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const [fullArticle, setFullArticle] = useState({})

    const readFullArticle = (obj) => {
        setFullArticle(obj)
    }

    const clearFullArticle = () => {
        setFullArticle({})
    }

    return (
        <div className="wrapper">

            <AppContext.Provider value={{
                options,
                fullArticle,
                readFullArticle,
                clearFullArticle
            }}>

                <Routes>

                    <Route
                        path="/" exact element={
                            <Home/>
                        }
                    />


                    <Route
                        path="/fullArticle" exact element={
                            <Article/>
                        }
                    />
                </Routes>
            </AppContext.Provider>


        </div>
    );
}

export default App;
