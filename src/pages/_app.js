import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import "../styles/global.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
    return (
        <div className="container">
            <Head>
                <title> {pageProps.title} 🚁 Neighbor Army</title>
            </Head>
            <Header></Header>
            <div className="content">
                <Component {...pageProps} />
                <style jsx>{`
                    .content {
                        display: flex;
                        padding: 3.2rem 0;
                        max-width: calc(100vw - 3.2rem);
                        margin: auto;
                        flex-grow: 1;
                    }

                    @media screen and (min-width: 480px) {
                        .content {
                            padding: 3.2rem 0;
                            max-width: calc(100vw - 7.2rem);
                        }
                    }

                    @media screen and (min-width: 768px) {
                        .content {
                            max-width: 70%;
                        }
                    }
                `}</style>
            </div>
            <Footer></Footer>
        </div>
    );
};

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any
};

export default MyApp;
