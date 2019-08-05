import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";
import Card from "@material-ui/core/Card";
import styled from "styled-components";

export default function Location() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon, unit } = context;
    const Card = styled.div`
        // position: relative;
        background-color: --var(mainGrey);
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.25);
        @media (max-width: 1000px) {
            top: 0;
            margin-top: 0;
            box-shadow: none;
        }
    `;

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
            <Card>hello</Card>
        </div>
    );
}
