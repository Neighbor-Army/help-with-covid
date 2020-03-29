import React from "react";
import { useRouter } from "next/router";

import CtaButton from "../components/CtaButton";

const IndexPage = () => {
    const router = useRouter();

    return (
        <main>
            <h1>Calling All Neighborhood Warriors</h1>
            <p>
                Let’s flatten the curve by fighting together to help those in
                need within our community.
            </p>
            <footer>
                <CtaButton onClick={() => router.push("/contact")}>
                    Request Help
                </CtaButton>
                <CtaButton
                    isSecondaryBtn={true}
                    onClick={() => router.push("/volunteer")}
                >
                    Offer Help
                </CtaButton>
            </footer>
            <style jsx>{`
                main {
                    text-align: center;
                    align-self: center;
                }

                footer {
                    max-width: 75%;
                    margin: 1.6rem auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 12rem;
                }

                @media screen and (min-width: 480px) {
                    footer {
                        flex-direction: row;
                        height: auto;
                        margin-top: 3.2rem;
                    }
                }

                @media screen and (min-width: 768px) {
                    main {
                        max-width: 88%;
                        margin: auto;
                    }
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
