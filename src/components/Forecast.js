import React, { useContext } from "react";
import { WeatherContext } from "../context";
import Skycons from "react-skycons";
import CardComponent from "./Card";
import Form from "./Form";
// <div className="switchBtn">
//                 {temperature ? (
//                     <label>
//                         °F
//                         <Switch
//                             onChange={handleUnitChange}
//                             checked={unitState}
//                         />
//                         °C
//                     </label>
//                 ) : null}

export default function Forecast() {
    const context = useContext(WeatherContext);
    const { temperature, summary, icon, unit, loading } = context;

    return <CardComponent>WEATHER</CardComponent>;
}
