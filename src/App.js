import React, { Component } from "react";
import WeatherContainer from "./components/WeatherContainer";
import Location from "./components/Location";
import Form from "./components/Form";
import "./css/bootstrap.min.css";
import "./css/App.css";
import Script from "react-load-script";
import Background from "./components/Background";
import DarkSky from "./DarkSky";

export default class App extends Component {
    render() {
        return (
            <Background>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${
                        DarkSky.googleKey
                    }&libraries=places`}
                />
                <div className="container text-center mx-auto my-5">
                    <Location />
                    <Form />
                    <WeatherContainer />
                </div>
            </Background>
        );
    }
}
