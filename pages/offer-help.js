import React from "react";
// import withAuthUser from "../utils/pageWrappers/withAuthUser";
// import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
// import Nav from "../components/layout/Nav";
import "../styles/global.scss";
import "../components/layout/Nav.scss";
import OfferHelpContent from "../components/OfferHelpContent";

const OfferHelp = () => {
    // const [authTab, setAuthTab] = useState("");

    return (
        <div>
            {/* <Nav authTab={authTab} setAuthTab={setAuthTab} /> */}
            <OfferHelpContent
                onSubmit={data => {
                    alert(JSON.stringify(data));
                }}
            />
        </div>
    );
};

OfferHelp.displayName = "OfferHelp";

OfferHelp.propTypes = {};

OfferHelp.defaultProps = {
    AuthUserInfo: null
};

export default OfferHelp; //withAuthUser(withAuthUserInfo(OfferHelp));
