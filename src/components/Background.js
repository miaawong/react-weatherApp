import React, { useContext } from "react";
import { WeatherContext } from "../context";

export default function Background() {
    const context = useContext(WeatherContext);
    let { backgroundImg, img } = context;
    img = `${img}`;

    return (
        <div>
            <img
                src={img}
                key={backgroundImg.id}
                alt={backgroundImg.alt_description}
            />
        </div>
    );
}
