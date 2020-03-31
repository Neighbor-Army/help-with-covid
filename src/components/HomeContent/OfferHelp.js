import React from "react";
import { useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import axios from "axios";

const OfferHelp = ({ setSuccess }) => {
    const { register, handleSubmit, errors, reset, setError } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async data => {
        try {
            const volunteer = {
                phone: data.phone,
                name: data.name,
                email: data.email,
                zipcode: String(data.zipcode)
            };

            await axios.post(
                "https://us-central1-neighbor-army.cloudfunctions.net/widgets/worker",
                volunteer
            );
            reset();
            setSuccess(true);
        } catch (err) {
            if (err.response && err.response.status === 500) {
                setError(
                    "phone",
                    "notMatch",
                    "There is already a volunteer with this phone number"
                );
            }
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
