import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";

export default function Location() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon } = context;

    return (
        <div>
            <h2>
                <div>
                    <Skycons
                        color="white"
                        icon={icon}
                        autoplay={true}
                        style={{ width: "5%", height: "5%" }}
                    />
                    {temperature} °F
                </div>
                <br />
                <div className="my-5">{summary}</div>
            </h2>
        </div>
    );
}
