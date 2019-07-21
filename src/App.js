import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";

import Location from "./components/Location";
import Form from "./components/Form";

export default class App extends Component {
    render() {
        return (
            <div>
                <Title />
                <Form />

                <Location />
                <h3> °F</h3>
            </div>
        );
    }
}
