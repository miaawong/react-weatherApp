import React, { Component } from "react";
import DarkSky from "./DarkSky";

const WeatherContext = React.createContext();

class WeatherProvider extends Component {
    state = {
        location: "",
        loading: false,
        temperature: null,
        summary: "",
        icon: "",
        latitude: 0,
        longitude: 0,
        tempIcon: "",
        backgroundImg: "",
        img: "",
        randomNum: "",
        searchString: "",
        city: "",
        imgQuery: ""
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
                    temperature:
                        ((data.currently.temperature * 10) / 10).toFixed(1) +
                        " °F",
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
            this.setState({
                location: data.results[2].formatted_address,
                imgQuery: data.results[5].formatted_address
            });
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
                    longitude
                });
                this.fetchWeather();
                this.fetchLocation();
            },
            () => {
                console.log("error");
            }
        );
    };

    handleInputChange = searchString => {
        this.setState({
            searchString
        });
    };

    search = async () => {
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
                imgQuery: json.results[0].formatted_address,
                loading: false,
                //resets form
                searchString: ""
            });
            this.fetchWeather();
            this.fetchImg();
        } catch (error) {
            console.log(error);
        }
    };
    fetchImg = async () => {
        this.randomNum();
        let { imgQuery, randomNum } = this.state;
        try {
            let response = await fetch(
                `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${imgQuery}&client_id=${
                    DarkSky.applicationId
                }`
            );
            console.log(response);
            let json = await response.json();
            this.setState({
                backgroundImg: json.results[randomNum],
                img: json.results[randomNum].urls.regular,
                loading: false
            });
        } catch (err) {
            console.log("error happened during fetching img" + err);
        }
    };

    randomNum = () => {
        let num = Math.floor(Math.random() * 11);
        this.setState({
            randomNum: num
        });
    };
    handleScript = () => {
        let options = {
            types: ["(cities)"]
        }; // to disable any eslint 'google not defined' errors
        // init google autocomplete
        /*global google */ this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options
        );
        // enableEnterKey(field);
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = async () => {
        // Extract City From Address Object
        let addressObject = await this.autocomplete.getPlace();
        if (addressObject) {
            let address = addressObject.address_components;
            if (address) {
                this.setState({
                    location: address[0].long_name,
                    searchString: addressObject.formatted_address
                });
                this.search();
            } else {
                alert("Please use auto suggestions, thanks!");
            }
        }
    };

    render() {
        let { img } = this.state;
        console.log(img);
        return (
            <WeatherContext.Provider
                value={{
                    ...this.state,
                    getGeoLocation: this.getGeoLocation,
                    fetchWeather: this.fetchWeather,
                    fetchLocation: this.fetchLocation,
                    handleInputChange: this.handleInputChange,
                    search: this.search,
                    handleScript: this.handleScript,
                    handlePlaceSelect: this.handlePlaceSelect
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
