/* eslint react/no-danger: 0 */
import React from "react";
import { get } from "lodash/object";
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render() {
        // Store initial props from request data that we need to use again on
        // the client. See:
        // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
        // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
        // Alternatively, you could use a store, like Redux.
        const { AuthUserInfo, pathName, hostName } = this.props;
        return (
            <Html>
                <Head>
                    <meta
                        property="og:url"
                        content={`${hostName}${pathName}`}
                    />
                    <meta property="og:type" content="article" />
                    <meta
                        property="og:title"
                        content="Calling All Neighborhood Warriors"
                    />
                    <meta
                        property="og:description"
                        content="Let’s fight as a community. We will flatten the curve and work together to find those that are in the most of need."
                    />
                    <meta
                        property="og:image"
                        content={`${hostName}/static/images/logo.png`}
                    />
                    <script
                        id="__MY_AUTH_USER_INFO"
                        type="application/json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(AuthUserInfo, null, 2)
                        }}
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

CustomDocument.getInitialProps = async ctx => {
    // Get the AuthUserInfo object. This is set if the server-rendered page
    // is wrapped in the `withAuthUser` higher-order component.
    const req = ctx.req || { headers: null };
    const headers = req.headers || { host: "" };
    const pathName = ctx.pathname;
    const hostName = headers.host;
    const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, AuthUserInfo, pathName, hostName };
};

export default CustomDocument;
