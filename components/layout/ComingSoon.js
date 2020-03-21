import React from "react";
import "./ComingSoon.scss";

const ComingSoon = () => {
    return (
        <div className="coming-soon">
            <div className="coming-soon-header-wrap">
                <h1>Calling all neighborhood warriors</h1>
                <p>
                    We will fight as a community. While we flatten the curve, we
                    will work together to find those that are in the most of
                    need.
                </p>
                {/* <div className="coming-soon-CTA">
                <button className="request-help">Request Help</button>
                <button className="offer-help">Offer Help</button>
            </div> */}
            </div>
            <div className="coming-soon-footer-wrap">
                <a
                    href="https://join.slack.com/t/dignityintegration/shared_invite/zt-cvthxjba-in6K5vY66B~XunMu3bVjcg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button>Join the Slack</button>
                </a>{" "}
                <br />
                <a
                    href="mailto:neighbor.army@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button>Contact Email</button>
                </a>{" "}
                <br />
                <a
                    href="https://github.com/Neighbor-Army/firebase"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button>GitHub Repo</button>
                </a>
            </div>
        </div>
    );
};

export default ComingSoon;
