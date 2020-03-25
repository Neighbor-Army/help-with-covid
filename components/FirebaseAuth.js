import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/auth/initFirebase";

// Init the Firebase app.
initFirebase();

const firebaseAuthConfig = {
    signInFlow: "popup",
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
                type: "image", // 'audio'
                size: "normal", // 'invisible' or 'compact'
                badge: "bottomleft", //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: "US",
            whitelistedCountries: [ "US" ],
            requireDisplayName: false,
        },
    ],
    signInSuccessUrl: "/",
    credentialHelper: "none",
};

const FirebaseAuth = () => {
    // Do not SSR FirebaseUI, because it is not supported.
    // https://github.com/firebase/firebaseui-web/issues/213
    const [ renderAuth, setRenderAuth ] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setRenderAuth(true);
        }
    }, []);
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={firebase.auth()} />
            ) : null}
        </div>
    );
};

export default FirebaseAuth;
