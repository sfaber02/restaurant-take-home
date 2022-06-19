import React from "react";
import { useParams } from "react-router-dom";

export const Error = () => {
    const { err } = useParams();

    return (
        <div>
            {err ? `Error: ${err}` : "Error"}
            <a href="/">Back</a>
        </div>
    );
};
