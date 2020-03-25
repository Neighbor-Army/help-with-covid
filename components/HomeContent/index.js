import React from "react";
import Link from "next/link";
import { routes } from "@/constants";
import "./HomeContent.scss";

const HomeContent = () => {
    return (
        <div className="home-content">
            <div className="home-content__header-wrap">
                <h1 className="hero-text">Calling All Neighborhood Warriors</h1>
                <p>
                    Let’s fight as a community. We will flatten the curve and
                    work together to find those that are in the most of need.
                </p>
            </div>
            <div className="home-content__cta-row">
                <div>
                    {/* TODO: add button styles from style guide */}
                    <Link href={routes.REQUEST_HELP}>
                        <button>Request Help</button>
                    </Link>
                    <br />
                    <Link href={routes.OFFER_HELP}>
                        <button className="offer-help-button">
                            Offer Help
                        </button>
                    </Link>
                </div>
            </div>
            <div className="home-content__footnote">
                <p>
                    Powered by the generosity of{" "}
                    <a
                        href="https://www.notion.so"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Notion
                    </a>
                    {", "}
                    <a
                        href="https://www.onfleet.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        OnFleet
                    </a>
                    , and amazing volunteers
                </p>
                <div className="home-content__footnote-social-media">
                    <a
                        href="https://twitter.com/neighbor_army"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/static/images/twitter.svg" alt="Twitter" />
                    </a>
                    <a
                        href="https://www.facebook.com/Neighbor-Army-105105971132142/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/static/images/facebook.svg" alt="Facebook" />
                    </a>
                    <a
                        href="https://www.instagram.com/neighbor_army/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/static/images/instagram.svg"
                            alt="Instagram"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
