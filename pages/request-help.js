import React from "react";
import RequestHelp from "../components/HomeContent/RequestHelp";
import Nav from "../components/layout/Nav";
import withAuthUser from "../utils/pageWrappers/withAuthUser";

const requestHelp = () => {
    return (
        <div>
            <Nav />
            <RequestHelp />
        </div>
    );
};

export default withAuthUser(requestHelp);
