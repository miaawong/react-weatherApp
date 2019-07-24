import React, { useContext } from "react";
import { WeatherContext } from "../context";
export default function Location() {
    const context = useContext(WeatherContext);
    const { location } = context;
    return (
        <div className="col mt-4">
            <h3>Current Location: {location}</h3>
        </div>
    );
}
