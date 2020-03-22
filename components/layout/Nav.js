import React from "react";
import PropTypes from "prop-types";
// import { routes } from "@/constants";
import Link from "next/link";
import "./Nav.scss";

const Nav = ({ setAuthTab }) => {
    return (
        <div className="nav">
            <div className="left-nav">
                <Link href="/">
                    <a>Neighbor Army</a>
                </Link>
            </div>
            <div className="right-nav">
                {/* <a href={routes.LOG_IN}>
                    <button onClick={() => setAuthTab("login")}>Log In</button>
                </a>
                <a href={routes.SIGN_UP}>
                    <button
                        onClick={() => setAuthTab("register")}
                        className="signup"
                    >
                        Sign Up
                    </button>
                </a> */}
            </div>
        </div>
    );
};

Nav.propTypes = {
    setAuthTab: PropTypes.func
};

export default Nav;
