import React from "react";
import { useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import { useRouter } from "next/router";
import axios from "axios";

import CtaButton from "../components/CtaButton";

const OfferHelpPage = () => {
    const router = useRouter();

    const { register, handleSubmit, errors, setError } = useForm({
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

            router.push("/volunteer-success");
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
        <div>
            <h1>Sign up to be a Volunteer</h1>
            <p>We appreciate your interest. How may we get in touch?</p>
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

                <CtaButton type="submit">Sign Up</CtaButton>
            </form>
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Volunteer" }
    };
}

export default OfferHelpPage;
