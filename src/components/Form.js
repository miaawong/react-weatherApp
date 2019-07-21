import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";

export default function Form() {
    const context = useContext(WeatherContext);
    const { getGeoLocation } = context;

    return (
        <>
            <button onClick={getGeoLocation}>
                <FaLocationArrow /> Use my Location
            </button>
            <form>
                <br />
                <input type="text" name="city" placeholder="city" />
                <input type="text" name="country" placeholder="country" />
                <button>Go</button>
            </form>
        </>
    );
}
