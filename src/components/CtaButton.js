import React from "react";
import PropTypes from "prop-types";

const CtaButton = ({ onClick, children, ...rest }) => (
    <button {...rest} onClick={onClick}>
        {children}
    </button>
);

CtaButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default CtaButton;
