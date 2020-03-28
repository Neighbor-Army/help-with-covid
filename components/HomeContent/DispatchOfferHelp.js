import React from "react";
import "./DispatchOfferHelp.scss";
import { useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import axios from "axios";
import * as logger from "../../utils/logger";

const DispatchOfferHelp = ({ setSuccess }) => {
    const { register, handleSubmit, errors, reset, setError } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async data => {
        logger.debug({ data });

        try {
            const dispatch = {
                phone: data.phone,
                name: data.name,
                email: data.email,
                zipcode: String(data.zipcode)
            };
            console.log(dispatch);
            logger.debug(dispatch);
            const res = await axios.post(
                "https://us-central1-neighbor-army.cloudfunctions.net/widgets/worker",
                dispatch
            );
            reset();
            setSuccess(true);
            logger.debug(res);
        } catch (err) {
            logger.error(err);
            if (err.response && err.response.status === 500) {
                setError(
                    "phone",
                    "notMatch",
                    "There is already a dispatch with this phone number"
                );
            }
        }
    };

    return (
        <div className="dispatch-offer-help">
            <div className="dispatch-offer-help__header-wrap">
                <h1 className="hero-text">Dispatcher Sign Up Form</h1>
                <p>
                    Thank you for volunteering during these troubled times.
                    Please fill out this form to become a dispatcher in your
                    neighborhood.
                </p>
            </div>
            <form
                className="dispatch-offer-help__form"
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
                        {errors.phone.message ||
                            "Please enter a valid phone number"}
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

                <input
                    placeholder="Zip Code"
                    name="zipcode"
                    type="numeric"
                    maxLength="5"
                    ref={register({
                        required: true
                        // pattern: /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./
                    })}
                ></input>

                <button>Submit</button>
            </form>

            <p className="dispatch-offer-help__footnote">
                Powered by the generosity of{" "}
                <a
                    href="https://www.notion.so"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Notion
                </a>
                {", "}
                <a
                    href="https://www.onfleet.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OnFleet
                </a>
                , and amazing dispatchs
            </p>
        </div>
    );
};

DispatchOfferHelp.propTypes = {
    setSuccess: PropTypes.func
};
export default DispatchOfferHelp;
