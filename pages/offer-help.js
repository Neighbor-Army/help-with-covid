import React, { useState } from "react";
import OfferHelp from "../components/HomeContent/OfferHelp";
import Nav from "../components/layout/Nav";
import VolunteerConfirmation from "../components/HomeContent/VolunteerConfirmation";

const offerHelp = () => {
    const [success, setSuccess] = useState(false);

    return (
        <div>
            <Nav />
            {!success ? <OfferHelp setSuccess={setSuccess}/> : <VolunteerConfirmation />}
        </div>
    );
};

export default offerHelp;
