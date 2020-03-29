import React from "react";
import PropTypes from "prop-types";

const CtaButton = ({ onClick, children, isSecondaryBtn = false, ...rest }) => (
    <button
        className={`btn btn-${isSecondaryBtn ? "secondary" : "primary"}`}
        {...rest}
        onClick={onClick}
    >
        {children}

        <style jsx>{`
            .btn {
                padding: 1.6rem;
                font-size: 1.4rem;
                font-weight: 700;
                border-radius: 0.4rem;
                margin: auto;
                min-width: 80%;
                transition: all 100ms ease-in-out;
            }

            .btn-primary {
                background: #18164e;
                color: #f2f2fa;
            }

            .btn-primary:hover {
                background: #3631cf;
                transform: scale(1.1);
            }

            .btn-primary:active {
                background: #6c6c99;
                transform: scale(1);
            }

            .btn-secondary {
                background: transparent;
                border: 2px solid #18164e;
                color: #18164e;
                padding: 1.4rem;
            }

            .btn-secondary:hover {
                border-color: #3631cf;
                color: #3631cf;
                transform: scale(1.1);
            }

            .btn-secondary:active {
                border-color: #6c6c99;
                color: #6c6c99;
                transform: scale(1);
            }

            @media screen and (min-width: 480px) {
                .btn {
                    min-width: 48%;
                }
            }

            @media screen and (min-width: 768px) {
                .btn {
                    min-width: 40%;
                }
            }
        `}</style>
    </button>
);

CtaButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    isSecondaryBtn: PropTypes.bool
};

export default CtaButton;
