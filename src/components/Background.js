import React, { useContext } from "react";
import { WeatherContext } from "../context";

export default function Background({ children }) {
    const context = useContext(WeatherContext);
    let { backgroundImg, img } = context;

    return (
        <div
            className="background"
            style={{
                backgroundImage: `url(${img})` ? `url(${img})` : ""
            }}
            key={backgroundImg.id}
        >
            {children}
        </div>
    );
}

Background.defaultProps = {
    styleClass: "background"
};
