import React, { useState, useEffect, useRef } from "react";
import loadScript from "../../utils/loadScript";
import PropTypes from "prop-types";

export default function AddressInput({ address, setAddress }) {
    // const [setSessionToken] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [setActive] = useState(false);
    let node = useRef(null);

    // Variables for Google Place API
    const google = window.google;
    // const location = new google.maps.LatLng(43.3148, -85.6024); // Latitude, longtitude of Michigan
    // Get session token on first render
    /* eslint-disable */
    useEffect(() => {
        document.querySelector("#google-maps");
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places`,
            document.querySelector("head"),
            "google-maps"
        );
    }, [document.querySelector("#google-maps")]);

    /* eslint-enable */
    useEffect(() => {
        document.addEventListener("mousedown", handleClick, false);
        return () => {
            document.removeEventListener("mousedown", handleClick, false);
        };
    }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return null;
        } else {
            setPredictions([]);
        }
    };

    const displaySuggestions = (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }

        setPredictions(predictions);
    };

    const handleInputChange = e => {
        const string = e.target.value;
        setAddress(string);
        var service = new google.maps.places.AutocompleteService();
        if ([2, 3, 4, 6, 8, 10, 12, 14, 16, 18].includes(string.length)) {
            service.getPlacePredictions(
                {
                    input: string,
                    componentRestrictions: { country: "us" },
                    types: ["address"]
                },
                displaySuggestions
            );
        }
    };

    const handleKeyDown = e => {
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor - 1);
            setAddress(predictions[cursor - 1].description);
        } else if (e.keyCode === 40 && cursor < predictions.length - 1) {
            setCursor(cursor + 1);
            setAddress(predictions[cursor + 1].description);
        }
    };

    const fillAddress = (address, e) => {
        e.preventDefault();
        setAddress(address);
        setPredictions([]);
    };

    return (
        <div style={{ width: "80%", marginRight: "40px" }}>
            <input
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder="Enter Address..."
                value={address}
                name="address"
            />
            <div
                className="search_result_container"
                style={{ position: "absolute" }}
            >
                <div ref={node} className="search_result_dropdown">
                    {predictions.length > 1 && address
                        ? predictions.map((prediction, i) => (
                            <div key={i}>
                                {cursor === i
                                    ? () => setActive(true)
                                    : () => setActive(false)}
                                <div
                                    key={prediction.id}
                                    className={
                                        cursor === i
                                            ? "active search_result_dropdown_item"
                                            : "search_result_dropdown_item"
                                    }
                                    style={{
                                        width: "550px",
                                        fontSize: "1.6rem",
                                        fontWeight: "300",
                                        fontFamily: "sofia-pro",
                                        padding: "15px"
                                    }}
                                    onClick={e =>
                                        fillAddress(prediction.description, e)
                                    }
                                >
                                    {prediction.description}
                                </div>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        </div>
    );
}

AddressInput.propTypes = {
    address: PropTypes.string,
    setAddress: PropTypes.func
};
