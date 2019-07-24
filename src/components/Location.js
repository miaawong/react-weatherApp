import React, { useContext } from "react";
import { WeatherContext } from "../context";
export default function Location() {
    const context = useContext(WeatherContext);
    const { location } = context;
    return (
        <div>
            <h2>Current Location: {location}</h2>
        </div>
    );
}
