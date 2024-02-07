import style from './HomeHeader.module.scss'

export const HomeHeader = ({
                           changeSorting,
                           sort,
                           onChangeSearchInput,
                           displayOptions,
                           setDisplayOptions
                       }) => {


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

            <button
                className={style.btnSort}
                onClick={changeSorting}>
                {sort ? "Сначала новые" : "Сначала старые"}
            </button>

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
