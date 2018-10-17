import { c } from './Actions';

export function mapReducer(oldState, action) {

    switch (action.type) {

        case c.CHANGE_VIEWPORT: {
            const updatedState = {...oldState, viewport: action.viewport};
            return updatedState;
        }

        case c.CHANGE_SELECTED_DATE: {
            const updatedState = {...oldState, selectedDayForWeather: action.selectedDayForWeather, selectedWordForWeather: action.selectedWordForWeather };
            return updatedState;
        }       

        case c.UPDATE_WEATHER_DATA: {
            const updatedState = {...oldState, weatherData: action.weatherData};
            return updatedState;
        }      

        default:
            if (!!oldState) {
                return oldState;
            };
            return {
                viewport: {
                    width: 500,
                    height: 500,
                    latitude: 37.7577,
                    longitude: -122.4376,
                    zoom: 9.5
                },
                weatherData: {
                    city: {
                        name: undefined,
                    },
                    list: [],
                },
                selectedDayForWeather: 0,
                selectedWordForWeather: "today",
            };
    }
};