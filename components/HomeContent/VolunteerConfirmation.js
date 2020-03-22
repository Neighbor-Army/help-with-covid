import React from "react";
import "./VolunteerConfirmation.scss";
import PropTypes from "prop-types";

const VolunteerConfirmation = ({ neighborhood }) => {
    return (
        <div className="volunteer-confirmation">
            <div className="volunteer-confirmation__header-wrap">
                <h1 className="hero-text">Please confirm your neighborhood</h1>
                <h3>{neighborhood.short_name}</h3>
                <button>Confirm</button>
            </div>
            <p className="volunteer-confirmation__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.twilio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twilio
                </a>
                {", "}
                <a
                    href="https://www.onfleet.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OnFleet
                </a>
                , and amazing volunteers
            </p>
        </div>
    );
};

VolunteerConfirmation.propTypes = {
    neighborhood: PropTypes.arrayOf(
        PropTypes.shape({
            short_name: PropTypes.string
        })
    )
};

export default VolunteerConfirmation;
