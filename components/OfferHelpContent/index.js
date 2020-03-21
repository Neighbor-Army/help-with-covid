import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../inputs/TextInput";

import "./OfferHelpContent.scss";

const OfferHelpContent = ({ onSubmit }) => {
    return (
        <div className="offer-help-content">
            <div className="offer-help-content__header-wrap">
                <h1 className="hero-text">I will help</h1>
                <p>
                    Praesentium animi minus ut blanditiis eligendi tempore.
                    Laudantium alias est veritatis occaecati cumque.
                </p>
            </div>
            <div className="offer-help-content__form-box">
                <h4>My contact information</h4>
                <Formik
                    initialValues={{
                        first: "",
                        last: "",
                        street: "",
                        apt: "",
                        country: "",
                        city: "",
                        state: "",
                        postal: ""
                    }}
                    onSubmit={onSubmit}
                    validationSchema={Yup.object().shape({
                        // email: Yup.string().email().required("Required"),
                        first: Yup.string().required("Required"),
                        last: Yup.string().required("Required"),
                        street: Yup.string().required("Required"),
                        apt: Yup.string().required("Required"),
                        city: Yup.string().required("Required"),
                        country: Yup.string().required("Required"),
                        state: Yup.string().required("Required"),
                        postal: Yup.string().required("Required")
                    })}
                >
                    {formikProps => {
                        /* eslint-disable react/prop-types */
                        const { isSubmitting, handleSubmit } = formikProps;
                        /* eslint-enable react/prop-types */

                        return (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <TextInput
                                        className="half"
                                        inputProps={{
                                            placeholder: "First Name",
                                            name: "first"
                                        }}
                                        formikProps={formikProps}
                                    />
                                    <TextInput
                                        className="half"
                                        inputProps={{
                                            placeholder: "Last Name",
                                            name: "last"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder: "Street",
                                            name: "street"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>

                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder:
                                                "Apartment etc. (Optional)",
                                            name: "apt"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder: "City",
                                            name: "city"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>

                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder: "Country",
                                            name: "country"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder: "State",
                                            name: "state"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        inputProps={{
                                            placeholder: "Postal",
                                            name: "postal"
                                        }}
                                        formikProps={formikProps}
                                    />
                                </div>

                                <div className="offer-help__actions">
                                    <a className="" href="/">
                                        &lt; Return to homepage
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>

            <p className="offer-help-content__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.twilio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twilio
                </a>
                {", "}
                <a
                    href="https://www.openfleet.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OpenFleet
                </a>
                , and amazing volunteers
            </p>
        </div>
    );
};

OfferHelpContent.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default OfferHelpContent;
