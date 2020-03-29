import React, { useState } from "react";

import OfferHelp from "../components/HomeContent/OfferHelp";
import VolunteerConfirmation from "../components/HomeContent/VolunteerConfirmation";

const offerHelp = () => {
    const [success, setSuccess] = useState(false);
    const [neighborhood, setNeighborhood] = useState([]);

    return (
        <div>
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

export async function getStaticProps() {
    return {
        props: { title: "Volunteer" } // will be passed to the page component as props
    };
}

export default offerHelp;
