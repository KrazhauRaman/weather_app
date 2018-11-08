import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { changeSelectedDate } from "../Redux/Actions";


class DateMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: [],
            opened: false,
        };
    };


    //при нажатии на кнопку с меню выбора даты в массив кнопок добавляются элементы
    //аниматор реакта реагирует на появление элементов и запускает анимацию появления
    //так же указывается, что состояние меню "открыто"
    openMenu() {

        this.setState({
            buttons: [
                <button key="1" className="buttonMain" data-day="0" data-word="today" onClick={el => this.setDate(el)}> Today </button>,
                <button key="2" className="buttonMain" data-day="1" data-word="tomorrow" onClick={el => this.setDate(el)}> Tomorrow </button>,
                <button key="3" className="buttonMain" data-day="2" data-word="the day after tomorrow" onClick={el => this.setDate(el)}> The day after tomorrow </button>
            ],
            opened: true,
        });
    };


    //при выборе какого-либо дня этот день идёт в стор, меню закрывается
    setDate(el) {

        this.props.changeSelectedDate(el.target.dataset.day, el.target.dataset.word)
        this.closeMenu();
    };


    //аниматор реакта реагирует на удаление элементов в массиве и запускает анимацию исчезновения
    //так же указывается, что состояние меню "закрыто"
    closeMenu() {

        this.setState({
            buttons: [],
            opened: false,
        });
    };


    render() {
        return (
            <div className="daySelector" style={{ position: 'absolute', right: 10, top: 60 }}>
                <button className="buttonMain"
                    onClick={(!this.state.opened) ? this.openMenu.bind(this) : this.closeMenu.bind(this)}> Choose date </button>
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={false} transitionEnterTimeout={500} transitionEnter={true} transitionLeaveTimeout={500} transitionLeave={true}>
                    {this.state.buttons}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({

    changeSelectedDate: (newDay, newWord) => dispatch(changeSelectedDate(newDay, newWord)),
})

export default connect(getDataFromStore, setDataToStore)(DateMenu);