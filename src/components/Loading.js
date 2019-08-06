import React from "react";
import { FireworkSpinner } from "react-spinners-kit";

export default function Loading() {
    return (
        <div className="loading">
            <FireworkSpinner size={50} color="white" />
        </div>
    );
}
