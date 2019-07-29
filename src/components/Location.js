import React, { useContext } from "react";
import { WeatherContext } from "../context";
export default function Location() {
    const context = useContext(WeatherContext);
    const { location } = context;
    return <h2>{location}</h2>;
}
