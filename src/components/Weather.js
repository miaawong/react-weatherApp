import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";

export default function Location() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon, unit } = context;

    return (
        <div className="weather">
            <Skycons
                color="white"
                icon={icon}
                autoplay={true}
                style={{ width: "15%", height: "15%" }}
            />
            {temperature} {unit}
            <br />
            {summary}
        </div>
    );
}
