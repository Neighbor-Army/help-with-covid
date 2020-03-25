import React, { useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash/object";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import Nav from "../components/layout/Nav";
import "../styles/global.scss";
import "../components/layout/Nav.scss";
import HomeContent from "../components/HomeContent";
import FirebaseAuth from "../components/FirebaseAuth";

/*
    Since there is already a sign up form, it makes
    sense to create the account there.

    I added a login button to the right nav that toggles
    between the button and future user name on authTab. When the
    button is clicked it sets authTab true.
    When authTab is true the main content is replace with
    the FirebaseAuth component for login.
    todo: Add password reset flow
*/

const Index = () => {
    const [ authTab, setAuthTab ] = useState(false);

    if (authTab)
        return (
            <div>
                <Nav authTab={authTab} setAuthTab={setAuthTab} />
                <FirebaseAuth />
            </div>
        );
    return (
        <div>
            <Nav authTab={authTab} setAuthTab={setAuthTab} />
            <HomeContent />

            {/* <p>Hi there!</p>
      {!AuthUser ? (
        <p>
          Logged inlinelock
        </p>
      ) : (
        <div>
          Logged Out
        </div>
      )} */}
        </div>
    );
};

// Just an example.
const mockFetchData = async userId => ({
    user: {
        ...(userId && {
            id: userId,
        }),
    },
    favoriteFood: "pizza",
});

Index.getInitialProps = async ctx => {
    // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
    // The AuthUserInfo object is available on both the server and client.
    const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);
    const AuthUser = get(AuthUserInfo, "AuthUser", null);

    // You can also get the token (e.g., to authorize a request when fetching data)
    // const AuthUserToken = get(AuthUserInfo, 'token', null)

    // You can fetch data here.
    const data = await mockFetchData(get(AuthUser, "id"));

    return {
        data,
    };
};

Index.displayName = "Index";

Index.propTypes = {
    AuthUserInfo: PropTypes.shape({
        AuthUser: PropTypes.shape({
            id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            emailVerified: PropTypes.bool.isRequired,
        }),
        token: PropTypes.string,
    }),
    data: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired,
        favoriteFood: PropTypes.string.isRequired,
    }).isRequired,
};

Index.defaultProps = {
    AuthUserInfo: null,
};

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
//export default withAuthUser(withAuthUserInfo(Index));
export default withAuthUser(Index);
