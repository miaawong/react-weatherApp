import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";
// import PlacesAutocomplete from "react-places-autocomplete";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import DarkSky from "../DarkSky";
import Script from "react-load-script";

export default function Form() {
    const context = useContext(WeatherContext);
    const {
        getGeoLocation,
        handleInputChange,
        handlePlaceSelect,
        search,
        searchString,
        handleScript
    } = context;

    return (
        <>
            <div className="col my-5 ">
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${
                        DarkSky.googleKey
                    }&libraries=places`}
                    onLoad={handleScript}
                />
                <button onClick={getGeoLocation} className="button">
                    <FaLocationArrow /> Use my Location
                </button>
                {/* <PlacesAutocomplete value={searchString}> */}
                <MuiThemeProvider>
                    <SearchBar
                        placeholder=""
                        id="autocomplete"
                        value={searchString}
                        onChange={handleInputChange}
                        onRequestSearch={() => console.log("searching")}
                        style={{ margin: "40px auto", maxWidth: 800 }}
                        hintText="Search City"
                    />

                    {/* </PlacesAutocomplete> */}
                </MuiThemeProvider>
            </div>
        </>
    );
}
