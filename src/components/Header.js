import React from "react";
import Link from "next/link";

import Logo from "./Logo";

const Header = () => {
    return (
        <header className="header">
            <Link href="/">
                <a className="header__logo" href="/">
                    <Logo />
                </a>
            </Link>
            <nav className="header__nav">
                <Link href="/dashboard">
                    <a href="/dashboard">Dashboard</a>
                </Link>
            </nav>
            <style jsx>{`
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 3.2rem 0;
                    width: 100%;
                    max-width: calc(100vw - 3.2rem);
                    margin: auto;
                }

                .header__logo {
                    max-width: 70%;
                }

                .header__nav {
                    font-size: 1.3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }

                .header__nav a:not(:first-child) {
                    display: block;
                    margin-top: 0.8rem;
                }

                @media screen and (min-width: 480px) {
                    header {
                        padding: 3.2rem 0;
                        max-width: calc(100vw - 7.2rem);
                        align-items: center;
                    }

                    .header__logo {
                        max-width: 50%;
                    }

                    .header__nav {
                        flex-direction: row;
                    }

                    .header__nav a:not(:first-child) {
                        margin-top: 0;
                        margin-left: 0.8rem;
                    }
                }

                @media screen and (min-width: 768px) {
                    header {
                        max-width: 70%;
                    }

                    .header__logo {
                        max-width: 33%;
                    }

                    .header__nav a:not(:first-child) {
                        margin-top: 0;
                        margin-left: 1.6rem;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;
