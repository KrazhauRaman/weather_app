import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mapReducer } from './Redux/Reducer';
import {watchFetchWeatherData} from "./Redux/Saga";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  mapReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchFetchWeatherData);

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
