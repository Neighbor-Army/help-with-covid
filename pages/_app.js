import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import "../styles/global.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
            <Head>
                <title> {pageProps.title} 🚁 Neighbor Army</title>
            </Head>
            <Header></Header>
            <main>
                <Component {...pageProps} />
                <style jsx>{`
                    main {
                        padding: 3.2rem 0;
                        max-width: calc(100vw - 3.2rem);
                        margin: auto;
                    }

                    @media screen and (min-width: 480px) {
                        main {
                            padding: 3.2rem 0;
                            max-width: calc(100vw - 7.2rem);
                        }
                    }

                    @media screen and (min-width: 768px) {
                        main {
                            max-width: 70%;
                        }
                    }
                `}</style>
            </main>
            <Footer></Footer>
        </div>
    );
};

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any
};

export default MyApp;
