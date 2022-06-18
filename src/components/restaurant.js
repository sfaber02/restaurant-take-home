import React from "react";
import { useParams, Link } from "react-router-dom";

const Restaurant = () => {
    return (
        <>
            <h1>RESTAURANT</h1>
            <Link to="/restaurants">Back</Link>
        </>
    )
}

export { Restaurant };