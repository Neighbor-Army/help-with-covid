import React from "react";

const VolunteerSuccessPage = () => {
    return (
        <main>
            <h1>Thank you for volunteering!</h1>
            <p>You will receive a text message shortly.</p> <br />
            <p>Please download OnFleet.</p>
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
        props: { title: "Thank you!" }
    };
}

export default VolunteerSuccessPage;
