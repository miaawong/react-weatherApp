import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Loading from "./Loading";
import CardComponent from "./Card";
import Form from "./Form";
import Forecast from "./Forecast";

export default function Container() {
    const context = useContext(WeatherContext);
    const { loading, temperature } = context;

    if (loading) {
        return (
            <CardComponent>
                <Loading />;
            </CardComponent>
        );
    }
    if (temperature) {
        return <Forecast />;
    }
    return <Form />;
}
