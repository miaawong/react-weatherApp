import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "./Form";
import Loading from "./Loading";

const useStyles = makeStyles({
    card: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        background: "rgba(52, 56, 56, 0.7)",
        width: "800px",
        height: "500px",
        boxShadow: "0 0 10px 2px rgba(0,0,0,0.25)",
        borderRadius: "5px",
        padding: "1rem",
        margin: "0 auto"
    }
});
// <div className="switchBtn">
//                 {temperature ? (
//                     <label>
//                         °F
//                         <Switch
//                             onChange={handleUnitChange}
//                             checked={unitState}
//                         />
//                         °C
//                     </label>
//                 ) : null}

export default function Weather({ children }) {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon, unit, loading } = context;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {loading ? <Loading /> : <Form />}
            {/* {temperature ? "hello" : <Form />} */}
            {/* <Form /> */}
        </Card>
    );
}
