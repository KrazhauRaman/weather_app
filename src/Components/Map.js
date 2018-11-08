import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import { connect } from 'react-redux';
import { changeViewport, fetchWeatherData } from "../Redux/Actions";
import DateMenu from "./DateMenu";
import TemperatureBlock from "./TemperatureBlock";


class Map extends Component {
  constructor(props) {
    super(props);

    this.mapDiv = React.createRef();
    this.mapRef = React.createRef();

    this.state = {
      lastTime: Date.now(),
    };
  };

  //в начале определяется размер экрана, чтобы растянуть карту, геопозиция пользователя и погода в этом месте
  componentDidMount() {

    this.setProperSize();
    window.addEventListener("resize", this.setProperSize.bind(this));

    this.getLocation();

    this.props.fetchWeatherData();
  };

  //если в пропсах поменялись координаты, то запускается неблоьшой таймер, после идет проверка на давность изменений координат.
  //если пользщователь перестал перемещаться по карте (200мс не делал ничего), то с сервера запрашивается информация о погоде и метсности по координатам
  componentDidUpdate(prevProps) {

    if (this.props.viewport.latitude !== prevProps.viewport.latitude || this.props.viewport.longitude !== prevProps.viewport.longitude) {
      setTimeout(checkLastUpdate.bind(this), 200);
    };

    function checkLastUpdate() {
      if ((this.state.lastTime + 199) < Date.now()) {
        this.props.fetchWeatherData();
      };
    };
  };

  //запрашивается геопозиция пользователя и отправляется в стор, чтобы сразу показывалась температура рядом
  getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.props.changeViewport({ ...this.props.viewport, latitude: position.coords.latitude, longitude: position.coords.longitude })
      );
    };
    this.props.fetchWeatherData();
  };

  //обновление в сторе размера экрана
  setProperSize() {
    this.props.changeViewport({ ...this.props.viewport, width: this.mapDiv.current.offsetWidth, height: this.mapDiv.current.offsetHeight });
  };

  //при смене позиции на карте записывается дата последнего изменения позиции и обновляются в сторе координаты
  onViewportChange = viewport => {
    this.props.changeViewport({ ...this.props.viewport, ...viewport });
    this.setState({
      lastTime: Date.now(),
    });
  };


  render() {

    return (
      <div ref={this.mapDiv} className="mapDiv">
        <ReactMapGL
          ref={this.mapRef}
          mapboxApiAccessToken={"pk.eyJ1IjoiZWFrdGhlY2F0IiwiYSI6ImNqbmFzZXd6MjAweGEza3A4cnZrNHZraXQifQ.cIbSGmYxwZOc2sNnxZ0hsQ"}
          {...this.props.viewport}
          onViewportChange={this.onViewportChange} >
          <div style={{ position: 'absolute', left: 10, top: 10 }}>
            <NavigationControl
              onViewportChange={this.onViewportChange}
            />
          </div>
          <TemperatureBlock />
          <DateMenu />
          <div>
            <Geocoder mapRef={this.mapRef}
              onViewportChange={this.onViewportChange}
              mapboxApiAccessToken={"pk.eyJ1IjoiZWFrdGhlY2F0IiwiYSI6ImNqbmFzZXd6MjAweGEza3A4cnZrNHZraXQifQ.cIbSGmYxwZOc2sNnxZ0hsQ"} />
          </div>
        </ReactMapGL>
      </div>
    );
  }
}

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({

  viewport: store.viewport,
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({

  changeViewport: (changedViewport) => dispatch(changeViewport(changedViewport)),
  fetchWeatherData: () => dispatch(fetchWeatherData())
})

export default connect(getDataFromStore, setDataToStore)(Map);