import React from "react";
import PropTypes from "prop-types";

const NeighborIcon = ({ children }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="16"
        height="16"
    >
        {children}
        <style jsx>{`
            svg {
                fill: currentColor;
                transition: all 200ms ease-in-out;
            }

            svg:hover {
                transform: scale(1.2);
                fill: #0245f2;
            }

            svg:active {
                transform: scale(1);
            }
        `}</style>
    </svg>
);

NeighborIcon.propTypes = {
    children: PropTypes.element
};

export default NeighborIcon;
