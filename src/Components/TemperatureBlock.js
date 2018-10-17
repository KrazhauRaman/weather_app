import React, { Component } from 'react';
import { connect } from 'react-redux';


class TemperatureBlock extends Component {

    render() {       

        let temperature = undefined;

        //сразу проверка на то, что массив загружен 
        //потом, в зависимости от выбранного дня, показывается температура
        //сервер присылает в ответе погоду на 5 дней, на каждые 3 часа. 
        //погода показывается на ближайшее время на сегодня и на это же время завтра\послезавтра

        if (this.props.temperature.length !== 0) {            
            switch (+this.props.dayForWeather) {
                
                case 1: {
                    temperature = this.props.temperature[8].main.temp;
                    break;
                }
                case 2: {
                    temperature = this.props.temperature[16].main.temp;
                    break;
                }
                default: {
                    temperature = this.props.temperature[0].main.temp;
                    break;
                }
            }
        };
       
        return (
            <div className="temperatureDiv" style={{ position: 'absolute', left: 10, top: 110 }}>
                <label>{"Temperature for " + this.props.wordForWeather}</label>
                <label>{"in " + this.props.place}</label>
                <label>{"is " + temperature + " degrees Celsius"}</label>
            </div>
        );
    }
}

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({
    wordForWeather: store.selectedWordForWeather,    
    dayForWeather: store.selectedDayForWeather,
    place: store.weatherData.city.name, 
    temperature: store.weatherData.list,    
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({
})

export default connect(getDataFromStore, setDataToStore)(TemperatureBlock);