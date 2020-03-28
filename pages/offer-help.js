import React, { useState } from "react";
import DispatchOfferHelp from "../components/HomeContent/DispatchOfferHelp";
import VolunteerOfferHelp from "../components/HomeContent/VolunteerOfferHelp";
import OfferHelp from "../components/HomeContent/OfferHelp";
import Nav from "../components/layout/Nav";
import VolunteerConfirmation from "../components/HomeContent/VolunteerConfirmation";

const offerHelp = () => {
    const [success, setSuccess] = useState(false);
    const [dispatch, setDispatch] = useState("");

    console.log(dispatch);

    return (
        <div>
            <Nav />
            <OfferHelp setDispatch={setDispatch} />
            {!success ? (
                dispatch === "dispatch" ? (
                    <DispatchOfferHelp setSuccess={setSuccess} />
                ) : dispatch === "volunteer" ? (
                    <VolunteerOfferHelp setSuccess={setSuccess} />
                ) : null
            ) : (
                <VolunteerConfirmation />
            )}
        </div>
    );
};

export default offerHelp;
