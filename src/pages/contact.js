import React from "react";

const RequestHelpPage = () => {
    return (
        <main>
            <h1>
                Text NEIGHBOR to <a href="tel:+19176344426">(917) 634-4426</a>
            </h1>
            <p>
                Please call or text us. You will be prompted with a few short
                questions and we will call you ASAP.
            </p>
            <style jsx>{`
                main {
                    text-align: center;
                    align-self: center;
                }
                @media screen and (min-width: 768px) {
                    main {
                        max-width: 80%;
                        margin: auto;
                    }
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
