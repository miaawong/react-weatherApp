import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";
// import PlacesAutocomplete from "react-places-autocomplete";
import SearchBar from "material-ui-search-bar";
import Script from "react-load-script";
import Switch from "@material-ui/core/Switch";
import DarkSky from "../DarkSky";
import CardComponent from "./Card";
export default function Form(props) {
    const context = useContext(WeatherContext);
    const {
        getGeoLocation,
        handleInputChange,
        searchString,
        handleScript,
        handleUnitChange,
        unitState,
        temperature
    } = context;

    return (
        <>
            <Script
                url={`https://maps.googleapis.com/maps/api/js?key=${
                    DarkSky.googleKey
                }&libraries=places`}
                onLoad={handleScript}
            />
            <CardComponent>
                <div className="form my-3">
                    <button onClick={getGeoLocation} className="button">
                        <FaLocationArrow size={20} />
                    </button>
                    <SearchBar
                        placeholder=""
                        id="autocomplete"
                        value={searchString}
                        onChange={handleInputChange}
                        onRequestSearch={() => console.log("searching")}
                        hintText="Search City"
                        style={{
                            width: 400,
                            borderRadius: "5px"
                        }}
                    />
                </div>
            </CardComponent>
        </>
    );
}
