import { call, put, takeLatest, select } from 'redux-saga/effects';
import { c } from './Actions';
import { getWeather } from "../Components/ServerRequest";

//тут комменты скорее для себя
//при вызове экшена "c.FETCH_WEATHER_DATA" вотчер реагирует и запускает "fetchWeatherDataAsync"
export function* watchFetchWeatherData() {
    yield takeLatest(c.FETCH_WEATHER_DATA, fetchWeatherDataAsync);
};

//по очереди выполняются yield-команды в генераторе
function* fetchWeatherDataAsync() {
    try {
        //из стора забираются нужные значения через select
        const latitude = yield select(state => state.viewport.latitude),
            longitude = yield select(state => state.viewport.longitude);
        //через call(функция, аргумент, аргумент) вызывается запрос на сервер. результат возвращается в data
        const data = yield call(getWeather, latitude, longitude);
        //через put вызывается action в редьсере, минуя экшены. то есть сама сага запускает исполнение в редьюсере
        yield put({ type: c.UPDATE_WEATHER_DATA, weatherData: data });

    } catch (error) {
        //на случай, если возникнет ошибка в процессе выполнения саги
        yield console.log("Error on getting weather data", error);
    }
}
