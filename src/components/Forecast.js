import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context";
import { FaArrowCircleLeft } from "react-icons/fa";
import Skycons from "react-skycons";

import Switch from "@material-ui/core/Switch";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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
        "@media (max-width:780px)": {
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
    //  console.log(formatted);
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
    const [formatted, setFormat] = useState(0);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    /* eslint-disable */
    useEffect(() => {
        setFormat(
            weeklyForecast.slice(1).map((item, index) => {
                let temp = item.temperatureHigh;
                temp = ((temp * 10) / 10).toFixed(1);

                if (unitState) {
                    temp = (temp - 32) * (5 / 9);
                    temp = ((temp * 10) / 10).toFixed(1);
                }
                let day = new Date(item.time * 1000);
                day = days[day.getDay()];
                let icon = item.icon;
                icon = icon.toUpperCase().replace(/-/g, "_");
                return (
                    <li key={index} className="forecast">
                        <h4>{day}</h4>
                        <div style={{ maxWidth: "75px", maxHeight: "75px" }}>
                            <Skycons
                                color="white"
                                icon={icon}
                                autoplay={true}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>

                        <h4>
                            {temp} {unit}
                        </h4>
                    </li>
                );
            })
        );
    }, [weeklyForecast, unitState, unit, days]);

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <div className="navbar">
                    <FaArrowCircleLeft
                        size={30}
                        onClick={clearAll}
                        style={{ float: "left" }}
                    />{" "}
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
                <div className="location">
                    <h1> {location} </h1>
                </div>
                <CardContent>
                    <div>
                        <h3>
                            <li>{weekday}</li>
                            <li>{currentDate}</li>
                        </h3>
                        <h4>
                            {" "}
                            <strong>{summary}</strong>{" "}
                        </h4>
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
                    <ExpansionPanelSummary
                        expandIcon={
                            <ExpandMoreIcon style={{ color: "white" }} />
                        }
                    >
                        <Typography component={"div"}>
                            <h5 style={{ fontWeight: "bold" }}>
                                {" "}
                                7 Day Forecast{" "}
                            </h5>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ padding: "0" }}>
                        <ul className="week">{formatted}</ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Card>
        </div>
    );
}
