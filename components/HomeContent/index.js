import React from "react";
import Link from "next/link";
import { routes } from "@/constants";
import "./HomeContent.scss";

const HomeContent = () => {
    return (
        <div className="home-content">
            <div className="home-content__header-wrap">
                <h1 className="hero-text">Calling all neighborhood warriors</h1>
                <p>
                    We will fight as a community. While we flatten the curve, we
                    will work together to find those that are in the most of
                    need.
                </p>
            </div>
            <div className="home-content__cta-row">
                <div>
                    {/* TODO: add button styles from style guide */}
                    <Link href={routes.REQUEST_HELP}>Request Help</Link>
                    <br />
                    <Link href={routes.OFFER_HELP}>Offer Help</Link>
                </div>
                <Link href={routes.COMMUNITY}>
                    <a className="subtle-link">
                        I want to be a community manager
                    </a>
                </Link>
            </div>
            <p className="home-content__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.twilio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twillio
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
