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
            <p className="home-content__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.twilio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twilio
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
        </div>
    );
};

export default HomeContent;
