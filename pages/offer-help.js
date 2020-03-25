import React, { useState } from "react";
import OfferHelp from "../components/HomeContent/OfferHelp";
import Nav from "../components/layout/Nav";
import VolunteerConfirmation from "../components/HomeContent/VolunteerConfirmation";
import withAuthUser from "../utils/pageWrappers/withAuthUser";

const offerHelp = () => {
    const [ success, setSuccess ] = useState(false);
    const [ neighborhood, setNeighborhood ] = useState([]);

    return (
        <div>
            <Nav />
            {!success ? (
                <OfferHelp
                    setSuccess={setSuccess}
                    setNeighborhood={setNeighborhood}
                    neighborhood={neighborhood}
                />
            ) : (
                <VolunteerConfirmation neighborhood={neighborhood} />
            )}
        </div>
    );
};

export default withAuthUser(offerHelp);
