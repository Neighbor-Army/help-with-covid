import React from "react";
import Link from "next/link";
import { routes } from "../../constants";

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
        </div>
    );
};

export default HomeContent;
