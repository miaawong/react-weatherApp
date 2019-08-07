import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
    card: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        background: "rgba(52, 56, 56, 0.7)",
        width: "800px",
        height: "350px",
        boxShadow: "0 0 10px 2px rgba(0,0,0,0.25)",
        borderRadius: "5px",
        padding: "1rem",
        margin: "0",
        justifyContent: "space-between",
        ["@media (max-width:780px)"]: {
            // eslint-disable-line no-useless-computed-key
            width: "100vw"
        }
    }
});
export default function CardComponent({ children }) {
    const classes = useStyles();

    return <Card className={classes.card}>{children}</Card>;
}
