import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";
// import PlacesAutocomplete from "react-places-autocomplete";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default function Form() {
    const context = useContext(WeatherContext);
    const { getGeoLocation, handleInputChange, search, searchString } = context;

    return (
        <>
            <div className="col my-5 ">
                <button onClick={getGeoLocation} className="button">
                    <FaLocationArrow /> Use my Location
                </button>
                {/* <PlacesAutocomplete value={searchString}> */}
                <MuiThemeProvider>
                    <SearchBar
                        value={searchString}
                        onChange={handleInputChange}
                        onRequestSearch={search}
                        style={{ margin: "40px auto", maxWidth: 800 }}
                        hintText="Search City"
                    />

                    {/* </PlacesAutocomplete> */}
                </MuiThemeProvider>
            </div>
        </>
    );
}
