import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Loading from "./Loading";
import Weather from "./Weather";

export default function WeatherContainer() {
    const context = useContext(WeatherContext);
    const { loading } = context;
    if (loading) {
        return (
            <Weather>
                <Loading />
            </Weather>
        );
    }

    return <Weather />;
}
