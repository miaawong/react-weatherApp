import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";

export default function Form() {
    const context = useContext(WeatherContext);
    const { getGeoLocation } = context;

    return (
        <>
            <section className="col my-3 ">
                <button onClick={getGeoLocation} className="button">
                    <FaLocationArrow /> Use my Location
                </button>
                <form>
                    <br />
                    <input
                        type="text"
                        name="city"
                        placeholder="city"
                        className="form"
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="country"
                        className="form"
                    />
                    <button className="button">Go</button>
                </form>
            </section>
        </>
    );
}
