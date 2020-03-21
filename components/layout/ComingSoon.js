import React from "react";
import "./ComingSoon.scss";
import { FaGithub } from "react-icons/fa";
import { FaSlack } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ComingSoon = () => {
    return (
        <div className="coming-soon">
            <div className="coming-soon-header-wrap">
                <h1>We are Coming Soon</h1>
                <p>
                    Let’s fight as a community. We will flatten the curve and
                    work together to find those that are in the most of need.
                </p>
                {/* <div className="coming-soon-CTA">
                <button className="request-help">Request Help</button>
                <button className="offer-help">Offer Help</button>
            </div> */}
            </div>
            <div className="coming-soon-footer-wrap">
                <p style={{ paddingRight: "25px" }}>Get involved.</p>
                <a
                    href="https://join.slack.com/t/dignityintegration/shared_invite/zt-cvthxjba-in6K5vY66B~XunMu3bVjcg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button style={{ display: "flex", alignContent: "center" }}>
                        <FaSlack />{" "}
                        <p
                            style={{
                                lineHeight: "1",
                                fontSize: "14px",
                                marginLeft: "5px"
                            }}
                        >
                            Join the Slack
                        </p>
                    </button>
                </a>{" "}
                <br />
                <div style={{ display: "flex", alignContent: "center" }}>
                    <a
                        href="mailto:anthony@neighborarmy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            style={{ display: "flex", alignContent: "center" }}
                        >
                            <IoIosMail />{" "}
                            <p
                                style={{
                                    lineHeight: "1",
                                    fontSize: "14px",
                                    marginLeft: "5px"
                                }}
                            >
                                Contact Email
                            </p>
                        </button>
                    </a>{" "}
                </div>
                <br />
                <div style={{ display: "flex", alignContent: "center" }}>
                    <a
                        href="https://github.com/Neighbor-Army/firebase"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            style={{ display: "flex", alignContent: "center" }}
                        >
                            <FaGithub />{" "}
                            <p
                                style={{
                                    lineHeight: "1",
                                    fontSize: "14px",
                                    marginLeft: "5px"
                                }}
                            >
                                GitHub Repo
                            </p>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
