import React, { useState, useEffect } from "react";
import DarkSky from "../DarkSky";

//with useEffect hook
const Background = props => {
    const [isLoading, setLoading] = useState(false);
    const [fetchedData, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log("sending rquest");
        fetch(
            `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=atlanta&client_id=${
                DarkSky.applicationId
            }`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("failed to fetch");
                }
                return res.json();
            })
            .then(data => {
                const fetchedData = {
                    url: data.results[0].urls.regular
                };
                setLoading(false);
                setData(fetchedData);
                console.log(data);
            });
    }, []);
    if (fetchedData) {
        return (
            <div
                className="background"
                style={{
                    backgroundImage: `url(${fetchedData.url})`
                }}
            >
                hello
            </div>
        );
    }
    return <p> loading</p>;
};
Background.defaultProps = {
    styleClass: "background"
};

export default Background;
