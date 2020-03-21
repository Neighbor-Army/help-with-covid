import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./TextInput.scss";

const TextInput = ({
    inputProps: { name, ...inputProps },
    formikProps: { errors, touched, values, handleBlur, handleChange },
    className,
    ...props
}) => (
    <div
        className={classNames("formik-text-input-container", className)}
        {...props}
    >
        <input
            name={name}
            type="text"
            className={
                errors[name] && touched[name]
                    ? "text-input error"
                    : "text-input"
            }
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            {...inputProps}
        />
        <div className="input-feedback">
            {errors[name] && touched[name] ? errors[name] : <>&nbsp;</>}
        </div>
    </div>
);

TextInput.propTypes = {
    className: PropTypes.string,
    inputProps: PropTypes.object,
    formikProps: PropTypes.object.isRequired
};

export default TextInput;
