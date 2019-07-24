import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";

export default function Location() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon } = context;

    return (
        <div className="col my-3">
            <h3>
                Current Weather:
                <div className="col">{temperature} °F</div>
                <div className="col">{summary}</div>
                <Skycons
                    color="white"
                    icon={icon}
                    autoplay={true}
                    style={{ width: "10%", height: "10%" }}
                />
            </h3>
        </div>
    );
}
