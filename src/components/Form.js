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
        searchString,
        handleScript
    } = context;

    return (
        <>
            <div className="form my-5 ">
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${
                        DarkSky.googleKey
                    }&libraries=places`}
                    onLoad={handleScript}
                />
                {/* <PlacesAutocomplete value={searchString}> */}
                <MuiThemeProvider>
                    <button onClick={getGeoLocation} className="button ">
                        <FaLocationArrow size={20} />
                    </button>
                    <SearchBar
                        placeholder=""
                        id="autocomplete"
                        value={searchString}
                        onChange={handleInputChange}
                        onRequestSearch={() => console.log("searching")}
                        style={{ marginRight: "0px !important", maxWidth: 500 }}
                        hintText="Search City"
                    />

                    {/* </PlacesAutocomplete> */}
                </MuiThemeProvider>
            </div>
        </>
    );
}
