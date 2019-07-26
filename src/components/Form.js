import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";

export default function Form() {
    const context = useContext(WeatherContext);
    const { getGeoLocation, handleInputChange, search, sayHello } = context;

    return (
        <>
            <section className="col my-3 ">
                <button onClick={getGeoLocation} className="button">
                    <FaLocationArrow /> Use my Location
                </button>
                <form onSubmit={search}>
                    <br />
                    <input
                        type="text"
                        placeholder="city"
                        className="form"
                        id="searchInput"
                        onChange={handleInputChange}
                    />
                    {/* <button onClick={sayHello}> hello</button> */}
                    <button>Go</button>
                </form>
            </section>
        </>
    );
}
