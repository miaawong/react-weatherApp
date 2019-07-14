import React from "react";

export default function Form(props) {
    console.log(props);
    return (
        <form onSubmit={(props.fetchWeather, props.fetchCoords)}>
            <input type="text" name="city" placeholder="city" />
            <input type="text" name="country" placeholder="country" />
            <button>Go</button>
        </form>
    );
}
