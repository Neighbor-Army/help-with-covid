import React from "react";
import ExternalLink from "../components/ExternalLink";
import { isAndroid, isIOS } from "react-device-detect";

const OnFleetLinks = {
    // prettier-ignore
    ANDROID: "https://play.google.com/store/apps/details?id=com.onfleet.driver.app",
    IOS: "https://apps.apple.com/us/app/onfleet-driver/id1084013403",
    DESKTOP: "https://onfleet.com/"
};

const VolunteerSuccessPage = () => {
    // prettier-ignore
    const onFleetLink = isIOS ? OnFleetLinks.IOS : isAndroid ? OnFleetLinks.ANDROID : OnFleetLinks.DESKTOP;

    return (
        <main>
            <h1>Thank you for volunteering!</h1>
            <p>You will receive a text message shortly.</p> <br />
            <p>
                Please download{" "}
                <ExternalLink to={onFleetLink}>OnFleet</ExternalLink>.
            </p>
            <style jsx>{`
                main {
                    text-align: center;
                    align-self: center;
                }
            `}</style>
        </main>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Thank you!" }
    };
}

export default VolunteerSuccessPage;
