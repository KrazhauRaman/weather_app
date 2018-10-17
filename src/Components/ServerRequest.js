export function getWeather(lat, lon) {

    const appid = "c3c29158ae79eb1c9b2ad2c30aabafd1", // id аккаунта для запросов
        units = "metric", //система измерения
        weatherType = "forecast"; // прогноз на несколько дней, weather на текущий момент

    // возвращается запрос, который после удачного выполнения переводит ответ из json в объект.
    // lat и lon - координаты места на карте для запроса по ним погоды 
    return fetch(
        `http://api.openweathermap.org/data/2.5/${weatherType}?lat=${lat}&lon=${lon}&APPID=${appid}&units=${units}`
        ,
        {
            method: "GET",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "accept": "application/json",
            },
            mode: "cors",
        })
        .then(result => result.json());
};