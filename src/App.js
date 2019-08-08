import React, { Component } from "react";
import Container from "./components/Container";
import "./css/bootstrap.min.css";
import "./css/App.css";
import Background from "./components/Background";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Background>
                    <Container />
                </Background>
            </MuiThemeProvider>
        );
    }
}
