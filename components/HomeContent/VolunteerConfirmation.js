import React from "react";
import PropTypes from "prop-types";

const VolunteerConfirmation = () => {
    return (
        <div>
            <h1>Thank you for volunteering!</h1>
            <p>You will receive a text message shortly.</p> <br />
            <p>Please download OnFleet.</p>
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
