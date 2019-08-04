import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { WeatherContext } from "../context";
// import PlacesAutocomplete from "react-places-autocomplete";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Switch from "@material-ui/core/Switch";
import DarkSky from "../DarkSky";
import Script from "react-load-script";

export default function Form() {
    const context = useContext(WeatherContext);
    const {
        getGeoLocation,
        handleInputChange,
        searchString,
        handleScript,
        handleUnitChange,
        unitState
    } = context;

    return (
        <>
            <Script
                url={`https://maps.googleapis.com/maps/api/js?key=${
                    DarkSky.googleKey
                }&libraries=places`}
                onLoad={handleScript}
            />
            <MuiThemeProvider>
                <div className="form my-5 ">
                    <button onClick={getGeoLocation} className="button">
                        <FaLocationArrow size={20} />
                    </button>
                    <SearchBar
                        placeholder=""
                        id="autocomplete"
                        value={searchString}
                        onChange={handleInputChange}
                        onRequestSearch={() => console.log("searching")}
                        style={{ width: 600, borderRadius: "5px" }}
                        hintText="Search City"
                    />
                    <label>
                        °F
                        <Switch
                            onChange={handleUnitChange}
                            checked={unitState}
                        />
                        °C
                    </label>
                </div>
            </MuiThemeProvider>
        </>
    );
}
