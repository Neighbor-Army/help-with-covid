import React from "react";

import HomeContent from "../components/HomeContent";

const Index = () => {
    return (
        <div>
            <HomeContent />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Home" }
    };
}

export default Index;
