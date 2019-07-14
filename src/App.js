import React, { Component } from "react";
import "./App.css";
import DarkSky from "./DarkSky";
import Title from "./components/Title";
import Form from "./components/Form";

export default class App extends Component {
    state = {
        location: [],
        latitude: null,
        longitude: null,
        weather: {}
    };
    // fetch weather from dark skies
    fetchWeather() {
        let { latitude, longitude } = this.state;
        // console.log("set stated" + longitude, latitude);
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let darkSkyApi =
            "https://api.darksky.net/forecast/" +
            DarkSky.secret +
            "/" +
            latitude +
            "," +
            longitude;
        let api = proxy + darkSkyApi;
        // console.log(api);
        fetch(api)
            .then(res => res.json())
            .then(data => {
                this.setState({ weather: data });
                console.log(data);
            })
            .catch(err => {
                console.log("oops error occurred during fetch");
            });
    }
    // reverse geolocation from google map api
    fetchLocation() {
        let { latitude, longitude } = this.state;
        let key = DarkSky.googleKey;
        let latlng = `${latitude},${longitude}`;

        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}`
        )
            .then(res => res.json())
            .then(data => {
                // accessing the data to retrieve location
                this.setState({ location: data.results[5].formatted_address });
            });
    }

    componentDidMount() {
        // when component first renders, navigator will ask if we can access current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                this.setState({
                    latitude,
                    longitude
                });
                // since location is retrieve with a callback, we fetch inside the callback
                this.fetchWeather();
                this.fetchLocation();
            });
        }
    }

    render() {
        let { location } = this.state;

        return (
            <div>
                <h1>React Weather App</h1>
                <Title title={location} />
                {/* <Form onSubmit={this.fetchWeather} /> */}
            </div>
        );
    }
}
