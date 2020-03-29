import React from "react";

const RequestHelpPage = () => {
    return (
        <main>
            <h1>Text NEIGHBOR to (917) 634-4426</h1>
            <p>
                Please call or text us. You will be prompted with a few short
                questions and we will call you ASAP.
            </p>
            <style jsx>{`
                main {
                    text-align: center;
                    align-self: center;
                }
            `}</style>
        </main>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Contact Us" }
    };
}

export default RequestHelpPage;
