import {AppContext} from "../app/App";
import {useContext} from "react";
import style from './Header.module.scss'

export const Header = () => {

    const {
        displayOptions,
        setDisplayOptions,
        onChangeSearchInput,
        sort,
        changeSorting
    } = useContext(AppContext)

    const handleCheckboxChange = (option) => {
        const newOptions = {
            ...displayOptions,
            [option]: !displayOptions[option]
        };

        const atLeastOneChecked = Object.values(newOptions).some(value => value);

        if (atLeastOneChecked) {
            setDisplayOptions(newOptions);
        } else {
            alert('Нельзя отключить все колонки!');
        }
    }

    return (
        <div className={style.header}>

            <btn
                className={style.btnSort}
                onClick={changeSorting}>
                {sort ? "Сначала новые" : "Сначала старые"}
            </btn>

            <div className={style.settings}>
                <label>
                    <input
                        type="checkbox"
                        checked={displayOptions.showTitle}
                        onChange={() => handleCheckboxChange("showTitle")}
                    />
                    Показывать заголовок
                </label>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        checked={displayOptions.showDate}
                        onChange={() => handleCheckboxChange("showDate")}
                    />
                    Показывать дату
                </label>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        checked={displayOptions.showText}
                        onChange={() => handleCheckboxChange("showText")}
                    />
                    Показывать текст
                </label>
            </div>

            <input
                type={"search"}
                className={style.inputSearch}
                placeholder={'введите заголовок'}
                onChange={onChangeSearchInput}
            />
        </div>
    )
}
