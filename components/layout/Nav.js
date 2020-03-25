import React from "react";
import PropTypes from "prop-types";
// import { routes } from "@/constants";
import Link from "next/link";
import "./Nav.scss";
import { useAuthUserInfo } from "../../utils/auth/hooks";

/*
    authTab controls login display
    false = show login button
    true = show cancel button
    todo: Add user auth state to logic so user name is displayed
    todo: when logged in.
    todo: Show actual user name
    todo: styling
    well showing a cancel button now, need to see if there is a better way.
*/

const Nav = ({ authTab, setAuthTab }) => {
    const curUser = useAuthUserInfo();
    console.log(curUser);

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
                 </a> */}
                {!authTab && !curUser.AuthUser.id ? (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            setAuthTab(true);
                        }}
                    >
                        Log In
                    </button>
                ) : curUser.AuthUser.id ? (
                    <span>{curUser.AuthUser.id}</span>
                ) : (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            setAuthTab(false);
                        }}
                    >
                        Cancel
                    </button>
                )}

                {/* <a href={routes.SIGN_UP}>
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
    setAuthTab: PropTypes.func,
};

export default Nav;
