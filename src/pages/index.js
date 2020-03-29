import React from "react";
import { useRouter } from "next/router";

import CtaButton from "../components/CtaButton";

const IndexPage = () => {
    const router = useRouter();

    return (
        <main>
            <h1>Calling All Neighborhood Warriors</h1>
            <p>
                Let’s fight as a community. We will flatten the curve and work
                together to find those that are in the most of need.
            </p>
            <footer>
                <CtaButton onClick={() => router.push("/contact")}>
                    Request Help
                </CtaButton>
                <CtaButton onClick={() => router.push("/volunteer")}>
                    Offer Help
                </CtaButton>
            </footer>
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
        props: { title: "Home" }
    };
}

export default IndexPage;
