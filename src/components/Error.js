import React from "react";
import { useParams } from "react-router-dom";


/**
 * simple error component for errors during fetch
 * @returns error message and back button which returns user to home page
 */
export const Error = () => {
    const { err } = useParams();

    return (
        <div>
            {err ? `Error: ${err}` : "Error"}
            <a href="/">Back</a>
        </div>
    );
};
