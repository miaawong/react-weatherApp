import React, { useContext } from "react";
import { WeatherContext } from "../context";
import { FaArrowCircleLeft } from "react-icons/fa";
import Skycons from "react-skycons";
import Switch from "@material-ui/core/Switch";
// import CardComponent from "./Card";

import { makeStyles } from "@material-ui/core/styles";
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
        // padding: "1rem",
        margin: "0 auto",
        // justifyContent: "space-between",
        color: "white",
        flexWrap: "wrap"
    },
    expansion: {
        background: "rgba(52, 56, 56, 0.7)",
        borderRadius: "5px",
        width: "800px",
        color: "white"
    }
});

export default function Forecast() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon, unit, location } = context;
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <div className="navbar">
                    <FaArrowCircleLeft size={30} />

                    <h1> {location} </h1>

                    <div className="switchBtn">
                        {temperature ? (
                            <label>
                                °F
                                <Switch
                                // onChange={handleUnitChange}
                                // checked={unitState}
                                />
                                °C
                            </label>
                        ) : null}
                    </div>
                </div>
                <CardContent>
                    <div>
                        <h3> date </h3> <h4> {summary}</h4>
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
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
                    <Typography variant="subtitle1">7 day Forecast</Typography>
                </ExpansionPanel>
            </Card>
        </div>
    );
}
