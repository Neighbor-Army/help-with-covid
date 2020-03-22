/* eslint react/prop-types: 0 */
import React from "react";
const Submit = ({ navigation }) => {
    const { go } = navigation;
    return (
        <div>
            <h3>Thank you for submitting. We will be in touch</h3>
            <button onClick={() => go("contact")}>Home</button>
        </div>
    );
};

export default Submit;
