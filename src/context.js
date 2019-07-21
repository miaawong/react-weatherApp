import React, { Component } from "react";
import DarkSky from "./DarkSky";

const WeatherContext = React.createContext();

class WeatherProvider extends Component {
    state = {
        location: {},
        loading: false,
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
    getGeoLocation = () => {
        // const options = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0
        // };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }

        function geoSuccess(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            // this.setState({
            //     latitude,
            //     longitude,
            //     loading: false
            // });
            console.log(latitude, longitude);
            // since location is retrieve with a callback, we fetch inside the callback
            // this.fetchWeather();
            // this.fetchLocation();
        }
        // const geoError = err => {
        //     switch (err.code) {
        //         case err.PERMISSION_DENIED:
        //             alert(
        //                 "Seemed like you denied permission to access your current location, please search instead."
        //             );
        //             break;
        //         case err.POSITION_UNAVAILABLE:
        //             alert(`${err.code}: Position unavailable`);
        //             break;
        //         case err.TIMEOUT:
        //             alert(`${err.code}: timed out`);
        //             break;
        //         case err.UNKNOWN_ERROR:
        //             alert(`${err.code}: Don't know what happened here`);
        //     }
    };

    // sayHello = () => {
    //     console.log("herrrlo");
    // };

    render() {
        return (
            <WeatherContext.Provider
                value={{
                    ...this.state,
                    getGeoLocation: this.getGeoLocation,
                    fetchWeather: this.fetchWeather,
                    fetchLocation: this.fetchLocation
                    // sayHello: this.sayHello
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
