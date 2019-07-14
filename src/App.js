import React, { Component } from "react";
import "./App.css";
import DarkSky from "./DarkSky";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {}
        };
    }
    componentDidMount() {
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let darkSkyApi =
            "https://api.darksky.net/forecast/" +
            DarkSky.secret +
            "/37.8267,-122.4233";
        let api = proxy + darkSkyApi;
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
    render() {
        return (
            <div>
                <h1>weatherApp</h1>
            </div>
        );
    }
}
