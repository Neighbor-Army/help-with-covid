import React, { useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash/object";
import Link from "next/link";
import Router from "next/router";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import Nav from "../components/layout/Nav";
import logout from "../utils/auth/logout";
import "../styles/global.scss";
import "../components/layout/Nav.scss";
import ComingSoon from "../components/layout/ComingSoon";

const Index = props => {
  const { AuthUserInfo, data } = props;
  const AuthUser = get(AuthUserInfo, "AuthUser", null);
  const { favoriteFood } = data;
  const [authTab, setAuthTab] = useState("");

  return (
    <div>
      <Nav authTab={authTab} setAuthTab={setAuthTab} />
      <ComingSoon />
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
      id: userId
    })
  },
  favoriteFood: "pizza"
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
    data
  };
};

Index.displayName = "Index";

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  }),
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string
    }).isRequired,
    favoriteFood: PropTypes.string.isRequired
  }).isRequired
};

Index.defaultProps = {
  AuthUserInfo: null
};

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Index));
