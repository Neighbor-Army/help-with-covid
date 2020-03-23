import React, { useState } from "react";
import "./OfferHelp.scss";
import { useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import axios from "axios";

const AddressInput = dynamic(() => import("./AddressInput"), { ssr: false });

const OfferHelp = ({ setSuccess, setNeighborhood, neighborhood }) => {
    const { register, handleSubmit, errors, reset } = useForm({
        mode: "onBlur"
    });
    const [address, setAddress] = useState("");
    const [addressArray, setAddressArray] = useState([]);

    console.log(neighborhood.id);

    const onSubmit = async data => {
        console.log(data, "data");
        let arr = {
            address: {
                state: addressArray[5].long_name,
                postalCode: addressArray[7].long_name,
                country: addressArray[6].long_name,
                city: addressArray[3].long_name,
                street: addressArray[0].long_name,
                number: addressArray[1].long_name
            }
        };
        var result = {};
        try {
            const res = await axios.post(
                "https://us-central1-neighbor-army.cloudfunctions.net/widgets/neighborhood",
                arr
            );
            result = res;
            setNeighborhood(res.data);
            reset();
            setSuccess(true);
        } catch (err) {
            console.log(err);
        }
        try {
            console.log(result);
            const volunteer = {
                phone: data.phone,
                name: data.name,
                email: data.email,
                neighborhoodID: result.data.id
            };
            console.log(volunteer);
            const res = await axios.post(
                "https://us-central1-neighbor-army.cloudfunctions.net/widgets/worker",
                volunteer
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
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
                    ref={register({ required: true, maxLength: 30 })}
                ></input>
                {errors.email && (
                    <p className="form__error">Please enter a valid email</p>
                )}
                <input
                    placeholder="Email"
                    name="email"
                    ref={register({
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/
                    })}
                ></input>
                {errors.phone && (
                    <p className="form__error">
                        Please enter a valid phone number
                    </p>
                )}
                <MaskedInput
                    mask={[
                        "(",
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                    ]}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    ref={ref =>
                        ref &&
                        register(ref.inputElement, {
                            required: true,
                            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                        })
                    }
                />

                <div className="address-divider">
                    <AddressInput
                        setAddressArray={setAddressArray}
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
    setSuccess: PropTypes.func,
    setNeighborhood: PropTypes.func,
    neighborhood: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })
    )
};

export default OfferHelp;
