import React, { Component } from "react";
import Container from "./components/Container";
import Location from "./components/Location";
import Form from "./components/Form";
import "./css/bootstrap.min.css";
import "./css/App.css";
import Background from "./components/Background";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        background: "#343838"
    }
});

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
