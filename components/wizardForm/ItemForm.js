/* eslint react/prop-types: 0 */
import React from "react";

const ItemForm = ({ label, type = "text", ...otherProps }) => (
    <div>
        {type === "text" ? (
            <>
                <label>{label}</label>
                <input type={type} {...otherProps} />
            </>
        ) : (
            <>
                <label />
                <input type={type} {...otherProps} />
                {label}
            </>
        )}
    </div>
);

export default ItemForm;
