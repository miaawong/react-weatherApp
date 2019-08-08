import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../context";
import { FaArrowCircleLeft } from "react-icons/fa";
import Skycons from "react-skycons";

import Switch from "@material-ui/core/Switch";
// import CardComponent from "./Card";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import Form from "./Form";

const useStyles = makeStyles({
    card: {
        display: "flex",
        alignItems: "center",
        background: "rgba(52, 56, 56, 0.7)",
        width: "800px",
        boxShadow: "0 0 10px 2px rgba(0,0,0,0.25)",
        borderRadius: "5px",
        margin: "0 ",
        color: "white",
        flexWrap: "wrap",
        ["@media (max-width:780px)"]: {
            width: "100vw"
        }
    },
    expansion: {
        background: "rgba(52, 56, 56, 0.7)",
        borderRadius: "5px",
        width: "100%",
        color: "white"
    }
});

export default function Forecast() {
    let formattedTemp;
    {
        useEffect(() => {
            let formattedTemp = weeklyForecast.map(day => {
                let temp = day.temperatureHigh;
                temp = ((temp * 10) / 10).toFixed(1);

                if (unitState) {
                    temp = (temp - 32) * (5 / 9);
                    temp = ((temp * 10) / 10).toFixed(1);
                }
                return temp;
            });
            console.log(formattedTemp);
        });
    }
    const context = useContext(WeatherContext);
    const {
        temperature,
        summary,
        icon,
        unit,
        location,
        currentDate,
        weekday,
        clearAll,
        unitState,
        handleUnitChange,
        weeklyForecast
    } = context;

    const classes = useStyles();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return (
        <div>
            <Card className={classes.card}>
                <div className="navbar">
                    <FaArrowCircleLeft size={30} onClick={clearAll} />

                    <h1> {location} </h1>

                    <div className="switchBtn">
                        {temperature ? (
                            <label>
                                °F
                                <Switch
                                    onChange={handleUnitChange}
                                    checked={unitState}
                                />
                                °C
                            </label>
                        ) : null}
                    </div>
                </div>
                <CardContent>
                    <div>
                        <h3>
                            {weekday}, {currentDate}
                        </h3>
                        <h4> {summary}</h4>
                    </div>

                    <div className="tempRn">
                        <div className="temperature">
                            {temperature} {unit}{" "}
                            <Skycons
                                color="white"
                                icon={icon}
                                autoplay={true}
                                style={{ width: "30%", height: "30%" }}
                            />{" "}
                        </div>
                    </div>
                </CardContent>

                <ExpansionPanel className={classes.expansion}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography component={"div"}>
                            <h5> 7 Day Forecast </h5>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ul className="week">
                        {weeklyForecast.slice(1).map(day => {
                            let weekDays = new Date(day.time * 1000);
                            weekDays = days[weekDays.getDay()];
                            let icon = day.icon;
                            icon = icon.toUpperCase().replace(/-/g, "_");
                            let temp = day.temperatureHigh;
                            return (
                                <li>
                                    <h4> {weekDays}</h4>
                                    <Skycons
                                        color="white"
                                        icon={icon}
                                        autoplay={true}
                                        style={{
                                            width: "80%",
                                            height: "80%"
                                        }}
                                    />
                                    <h4>
                                        {temp} {unit}
                                    </h4>
                                </li>
                            );
                        })}
                    </ul>

                    <ExpansionPanelDetails />
                </ExpansionPanel>
            </Card>
        </div>
    );
}
