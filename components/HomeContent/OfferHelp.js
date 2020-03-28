import React, { useState } from "react";
import PropTypes from "prop-types";

const OfferHelp = ({ setDispatch }) => {
    const [clicked, setClicked] = useState("");

    console.log(clicked);

    return (
        <div style={{ display: `${clicked}` }} className="offer-help">
            <h1>Thank you for offering to help</h1>
            <h3>Please choose the type of volunteer</h3>
            <div className="offer-help__cta">
                <div
                    className="offer-help__cta__dispatch"
                    onClick={() => {
                        setDispatch("dispatch"), setClicked("none");
                    }}
                >
                    <img src="static/images/Dispatcher.png"></img>
                    <button>Dispatcher</button>
                </div>
                <div
                    className="offer-help__cta__volunteer"
                    onClick={() => {
                        setDispatch("volunteer"), setClicked("none");
                    }}
                >
                    <img src="static/images/Volunteer.png"></img>
                    <button className="volunteer-offer-help-button">
                        Driver
                    </button>
                </div>
            </div>
        </div>
    );
};

OfferHelp.propTypes = {
    setDispatch: PropTypes.func
};

export default OfferHelp;
