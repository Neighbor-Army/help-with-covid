import React from "react";
import "./VolunteerConfirmation.scss";

const VolunteerConfirmation = () => {
    return (
        <div className="volunteer-confirmation">
            <div className="volunteer-confirmation__header-wrap">
                <h1 className="hero-text">Thank you for volunteering!</h1>
                <p>You will receive a text message shortly.</p> <br />
                <p>Please download OnFleet.</p>
            </div>
            <p className="volunteer-confirmation__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.notion.so"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Notion
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

VolunteerConfirmation.propTypes = {};

export default VolunteerConfirmation;
