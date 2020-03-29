import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        property="og:title"
                        content="Calling All Neighborhood Warriors"
                    />
                    <meta
                        property="og:description"
                        content="Let’s fight as a community. We will flatten the curve and work together to find those that are in the most of need."
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
