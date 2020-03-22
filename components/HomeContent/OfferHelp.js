import React, { useState } from "react";
import "./OfferHelp.scss";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import axios from "axios";

const AddressInput = dynamic(() => import("./AddressInput"), { ssr: false });

const OfferHelp = ({ setSuccess }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [address, setAddress] = useState("");

    const onSubmit = async data => {
        axios
            .post("", { data })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log("environment variables", process.env);
        console.log(data);
        reset();
        setSuccess(true);
    };

    return (
        <div className="offer-help">
            <div className="offer-help__header-wrap">
                <h1 className="hero-text">Volunteer Sign Up Form</h1>
                <p>
                    Thank you for volunteering during these troubled times.
                    Please fill out this form to become a volunteer in your
                    neighborhood.
                </p>
            </div>
            <form
                className="offer-help__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                {errors.name && (
                    <p className="form__error">Please enter a name</p>
                )}
                <input
                    placeholder="Name"
                    name="name"
                    ref={register({ required: true, maxLength: 20 })}
                ></input>

                {errors.phone && (
                    <p className="form__error">Please enter a valid phone</p>
                )}
                <input
                    placeholder="Phone Number"
                    name="phone"
                    ref={register({
                        required: true,
                        pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                    })}
                ></input>

                <div className="address-divider">
                    <AddressInput
                        address={address}
                        setAddress={setAddress}
                        className="address"
                        placeholder="Address"
                        name="address"
                        ref={register({
                            required: true
                            // pattern: /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./
                        })}
                    ></AddressInput>

                    <input
                        className="unit-number"
                        placeholder="Apt #"
                        name="unit"
                        ref={register({
                            required: false
                            // pattern: /sdval="\d{3}"/
                        })}
                    ></input>
                    {errors.unit && (
                        <p className="form__error">Please enter a valid unit</p>
                    )}
                </div>
                <button>Submit</button>
            </form>

            <p className="offer-help__footnote">
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
                    href="https://www.onfleet.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OnFleet
                </a>
                , and amazing volunteers
            </p>
        </div>
    );
};

OfferHelp.propTypes = {
    setSuccess: PropTypes.func
};

export default OfferHelp;
