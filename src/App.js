import React, { Component } from "react";
import "./App.css";
import DarkSky from "./DarkSky";
import Title from "./components/Title";
import Loading from "./components/Loading";
import Location from "./components/Location";
import Form from "./components/Form";

export default class App extends Component {
    state = {
        loading: true,
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
                this.setState({ weather: data.currently });
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
                this.setState({ location: data.results[2].formatted_address });
            });
    }

    componentDidMount() {
        // when component first renders, navigator will ask if we can access current location
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const geoSuccess = position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            this.setState({
                latitude,
                longitude,
                loading: false
            });
            // since location is retrieve with a callback, we fetch inside the callback
            this.fetchWeather();
            this.fetchLocation();
        };
        const geoError = err => {
            switch (err.code) {
                case err.PERMISSION_DENIED:
                    alert(
                        "Seemed like you denied permission to access your current location, please search instead."
                    );
                    break;
                case err.POSITION_UNAVAILABLE:
                    alert(`${err.code}: Position unavailable`);
                    break;
                case err.TIMEOUT:
                    alert(`${err.code}: timed out`);
                    break;
                case err.UNKNOWN_ERROR:
                    alert(`${err.code}: Don't know what happened here`);
            }
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
    }

    render() {
        let { location, weather, loading } = this.state;
        let temperature = Math.round(weather.temperature);
        if (loading) {
            return <Loading />;
        }
        return (
            <div>
                <Title />
                <Location location={location} />
                <h3>{temperature} °F</h3>
                {/* <Form onSubmit={this.fetchWeather} /> */}
            </div>
        );
    }
}
