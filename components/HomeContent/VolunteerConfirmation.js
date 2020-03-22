import React from "react";
import "./VolunteerConfirmation.scss";

const VolunteerConfirmation = () => {
    return (
        <div className="volunteer-confirmation">
            <div className="volunteer-confirmation__header-wrap">
                <h1 className="hero-text">Calling All Neighborhood Warriors</h1>
                <p>
                    Let’s fight as a community. We will flatten the curve and
                    work together to find those that are in the most of need.
                </p>
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

export default VolunteerConfirmation;
