import React from "react";
import { CircleSpinner } from "react-spinners-kit";

export default function Loading() {
    return (
        <div className="loading">
            <CircleSpinner size={50} color="white" />
        </div>
    );
}
