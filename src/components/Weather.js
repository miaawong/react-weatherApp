import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";

export default function Location() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon } = context;

    return (
        <div className="weather">
            <Skycons
                color="white"
                icon={icon}
                autoplay={true}
                style={{ width: "5%", height: "5%" }}
            />
            {temperature}
            <br />
            {summary}
        </div>
    );
}
