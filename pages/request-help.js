import React from "react";

import RequestHelp from "../components/HomeContent/RequestHelp";

const requestHelp = () => {
    return (
        <div>
            <RequestHelp />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Contact Us" } // will be passed to the page component as props
    };
}

export default requestHelp;
