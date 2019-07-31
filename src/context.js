import React, { Component } from "react";
import DarkSky from "./DarkSky";

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
        searchString: "",
        backgroundImg: "",
        img: "",
        randomNum: ""
    };

    // fetch weather from dark skies
    fetchWeather = () => {
        let { latitude, longitude } = this.state;
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let darkSkyApi =
            "https://api.darksky.net/forecast/" +
            DarkSky.secret +
            "/" +
            latitude +
            "," +
            longitude;
        let api = proxy + darkSkyApi;
        fetch(api)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    temperature: data.currently.temperature + " °F",
                    summary: data.currently.summary,
                    tempIcon: data.currently.icon
                });

                this.findIcon();
            })
            .catch(err => {
                console.log("oops error occurred during fetchweather");
            });
    };
    findIcon = () => {
        let { tempIcon, icon } = this.state;
        icon = tempIcon.toUpperCase().replace(/-/g, "_");

        this.setState({
            icon
        });
    };
    // reverse geolocation from google map api
    fetchLocation = async () => {
        let { latitude, longitude } = this.state;
        let key = DarkSky.googleKey;
        let latlng = `${latitude},${longitude}`;
        try {
            let response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${key}`
            );
            let data = await response.json();
            this.setState({ location: data.results[2].formatted_address });
        } catch (error) {
            console.log(error);
        }
        this.fetchImg();
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
                this.fetchLocation();
            },
            () => {
                console.log("error");
            }
        );
    };

    handleInputChange = e => {
        if (e.target.value)
            this.setState({
                searchString: e.target.value
            });
    };

    search = async e => {
        e.preventDefault();
        let { searchString } = this.state;
        this.setState({
            loading: true
        });

        let proxy = "https://cors-anywhere.herokuapp.com/";
        try {
            let response = await fetch(
                `${proxy}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&key=${
                    DarkSky.googleKey
                }`
            );
            let json = await response.json();
            this.setState({
                latitude: json.results[0].geometry.location.lat,
                longitude: json.results[0].geometry.location.lng,
                location: json.results[0].formatted_address,
                loading: false,
                //resets form
                searchString: ""
            });
            console.log(json.results[0].formatted_address);
            this.fetchWeather();
            this.randomNum();
            this.fetchImg();
        } catch (error) {
            console.log(error);
        }
    };
    fetchImg = async () => {
        let { location, randomNum } = this.state;
        console.log(location);
        try {
            let response = await fetch(
                `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${location}&client_id=${
                    DarkSky.applicationId
                }`
            );
            let data = await response.json();
            // turn response to json

            // set data to imgs array
            this.setState({
                backgroundImg: data.results[randomNum],
                img: data.results[randomNum].urls.regular
            });
            console.log(data.results[randomNum]);
        } catch (err) {
            console.log("error happened during fetching img");
        }
    };

    randomNum = () => {
        let num = Math.floor(Math.random() * 11);
        this.setState({
            randomNum: num
        });
    };

    render() {
        console.log();
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
