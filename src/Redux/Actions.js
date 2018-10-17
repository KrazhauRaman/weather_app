//типы забиты в константы, чтобы труднее было ошибиться при вводе 
export const c = {
    CHANGE_VIEWPORT: "CHANGE_VIEWPORT",
    CHANGE_SELECTED_DATE: "CHANGE_SELECTED_DATE",
    UPDATE_WEATHER_DATA: "UPDATE_WEATHER_DATA",
    FETCH_WEATHER_DATA: "FETCH_WEATHER_DATA",
};

export const changeViewport = (changedViewport) => {
    return {
        type: c.CHANGE_VIEWPORT,
        viewport: changedViewport,
    };
};

export const changeSelectedDate = (newDay, newWord) => {
    return {
        type: c.CHANGE_SELECTED_DATE,
        selectedDayForWeather: newDay,
        selectedWordForWeather: newWord,
    };
};

// export const updateWeatherData = (newData) => {
//     return {
//         type: c.UPDATE_WEATHER_DATA,
//         weatherData: newData,
//     };
// };

export const fetchWeatherData = () => {
    return {
        type: c.FETCH_WEATHER_DATA,
    };
};