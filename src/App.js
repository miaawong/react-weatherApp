import React, { Component } from "react";
import Title from "./components/Title";
import WeatherContainer from "./components/WeatherContainer";
import Location from "./components/Location";
import Form from "./components/Form";
import "./css/bootstrap.min.css";
import "./css/App.css";

export default class App extends Component {
    render() {
        return (
            <div className="container text-center my-3 mx-auto">
                <Title />
                <Location />
                <Form />
                {/* <SearchBar /> */}
                <WeatherContainer />
            </div>
        );
    }
}
