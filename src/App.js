import React, { Component } from "react";
import WeatherContainer from "./components/WeatherContainer";
import Location from "./components/Location";
import Form from "./components/Form";
import "./css/bootstrap.min.css";
import "./css/App.css";
import Background from "./components/Background";

export default class App extends Component {
    render() {
        return (
            <Background>
                <div className="container text-center mx-auto my-5">
                    <Location />
                    <Form />
                    <WeatherContainer />
                </div>
            </Background>
        );
    }
}
