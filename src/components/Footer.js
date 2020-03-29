import React from "react";

import ExternalLink from "./ExternalLink";
import NeighborIcon from "./NeighborIcon";

const Footer = () => {
    return (
        <footer>
            <small className="colophon">
                Powered by{" "}
                <ExternalLink to="https://www.notion.so">Notion</ExternalLink>
                {", "}
                <ExternalLink to="https://www.onfleet.com">
                    OnFleet
                </ExternalLink>{" "}
                and an army of volunteers!
            </small>

            <ul>
                <li>
                    <ExternalLink to="mailto:support@neighborsupport.zendesk.com?subject=Neighbor Army Support - ">
                        <NeighborIcon>
                            <path d="M476 3.2L12.5 270.6a24 24 0 002.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5a24 24 0 0042.5 15.8L282 426l124.6 52.2a24 24 0 0033-18.2l72-432A24 24 0 00476 3.2z" />
                        </NeighborIcon>
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink to="https://twitter.com/neighbor_army">
                        <NeighborIcon>
                            <path d="M459.4 151.7c.3 4.6.3 9.1.3 13.7 0 138.7-105.6 298.5-298.6 298.5A296.5 296.5 0 010 417a217 217 0 0025.3 1.2c49 0 94.3-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8a111 111 0 0047.4-2 105 105 0 01-84.1-103v-1.2c14 7.8 30.2 12.6 47.4 13.3A104.9 104.9 0 0135.7 67.2a298.3 298.3 0 00216.4 109.9 104.9 104.9 0 01179-95.8 206.6 206.6 0 0066.6-25.4 104.7 104.7 0 01-46.1 57.8c21-2.3 41.6-8.1 60.4-16.2a225.6 225.6 0 01-52.6 54.2z" />
                        </NeighborIcon>
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink to="https://www.facebook.com/Neighbor-Army-105105971132142/">
                        <NeighborIcon>
                            <path d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.3V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.6-96.5 27.2 0 55.5 4.8 55.5 4.8v61h-31.2c-30.8 0-40.4 19.1-40.4 38.8V256h68.7l-11 71.7h-57.8V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z" />
                        </NeighborIcon>
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink to="https://www.instagram.com/neighbor_army/">
                        <NeighborIcon>
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6a74.8 74.8 0 11.1-149.3 74.8 74.8 0 01-.1 149.3zm146.4-194.3a26.7 26.7 0 11-53.6 0 26.8 26.8 0 0153.6 0zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388a75.6 75.6 0 01-42.6 42.6c-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9A75.6 75.6 0 0149.4 388c-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1A75.6 75.6 0 0192 81.2c29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9a75.6 75.6 0 0142.6 42.6c11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </NeighborIcon>
                    </ExternalLink>
                </li>
            </ul>
            <style jsx>{`
                footer {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.3rem;
                    padding: 3.2rem 0;
                    width: 100%;
                    max-width: calc(100vw - 3.2rem);
                    margin: auto;
                }
                .colophon {
                    max-width: 75%;
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }

                ul li {
                    max-width: 1.6rem;
                    margin-top: 0.8rem;
                }

                ul li svg {
                    display: block;
                }

                @media screen and (min-width: 480px) {
                    footer {
                        padding: 3.2rem 0;
                        max-width: calc(100vw - 7.2rem);
                    }

                    ul {
                        flex-direction: row;
                    }

                    li {
                        margin-top: 0;
                        margin-left: 1.6rem;
                    }
                }

                @media screen and (min-width: 768px) {
                    footer {
                        max-width: 70%;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
