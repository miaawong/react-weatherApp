import React, { Component } from "react";
import DarkSky from "./DarkSky";
import { async } from "q";

const WeatherContext = React.createContext();

class WeatherProvider extends Component {
    state = {
        location: "",
        loading: "",
        temperature: null,
        summary: "",
        icon: "",
        latitude: 0,
        longitude: 0,
        tempIcon: "",
        searchString: ""
    };

    // fetch weather from dark skies
    fetchWeather = () => {
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
                this.setState({
                    temperature: data.currently.temperature,
                    summary: data.currently.summary,
                    tempIcon: data.currently.icon
                });
                // console.log(data);
                this.findIcon();
            })
            .catch(err => {
                console.log("oops error occurred during fetchweather");
            });
    };
    findIcon = () => {
        let { tempIcon, icon } = this.state;
        icon = tempIcon.toUpperCase().replace(/-/g, "_");
        console.log(icon);
        this.setState({
            icon
        });
    };
    // reverse geolocation from google map api
    fetchLocation = () => {
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
            })
            .catch(err => {
                console.log("error happened in fetchLocation");
            });
    };
    getGeoLocation = () => {
        this.setState({
            loading: true
        });
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(
            position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                this.setState({
                    latitude,
                    longitude,
                    loading: false
                });
                this.fetchWeather();
                //  this.fetchLocation();
            },
            () => {
                console.log("error");
            }
        );
    };

    handleInputChange = e => {
        // e.preventDefault();
        if (e.target.value)
            this.setState({
                searchString: e.target.value
            });
    };

    search = async e => {
        e.preventDefault();
        let { searchString } = this.state;
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let response = await fetch(
            `${proxy}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&key=${
                DarkSky.googleKey
            }`
        );
        let data = await response.json().then(data => {
            this.setState({
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng,
                location: data.results[0].formatted_address
            });
            console.log(data);
            this.fetchWeather();
        });
    };

    render() {
        let { latitude, longitude, location } = this.state;

        console.log(latitude, longitude, location);
        return (
            <WeatherContext.Provider
                value={{
                    ...this.state,
                    getGeoLocation: this.getGeoLocation,
                    fetchWeather: this.fetchWeather,
                    fetchLocation: this.fetchLocation,
                    handleInputChange: this.handleInputChange,
                    search: this.search
                }}
            >
                {this.props.children}
            </WeatherContext.Provider>
        );
    }
}

const WeatherConsumer = WeatherContext.Consumer;

//higher order component
export function withWeatherConsumer(Component) {
    // props = <roomconsumer props>
    return function ConsumerWrapper(props) {
        return (
            <WeatherConsumer>
                {/*  returning the component that was passed in , access the possible props */}
                {value => <Component {...props} context={value} />}
            </WeatherConsumer>
        );
    };
}
export { WeatherProvider, WeatherConsumer, WeatherContext };
