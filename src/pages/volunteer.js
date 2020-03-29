import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

import CtaButton from "../components/CtaButton";
import FormField from "../components/FormField";

const OfferHelpPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async data => {
        setIsSubmitting(true);
        setServerError("");
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
            setIsSubmitting(false);
            if (err.response && err.response.status === 500) {
                setServerError(
                    "There is already a volunteer with this phone number"
                );
            }
        }
    };

    return (
        <main>
            <header>
                <h1>Sign up to be a Volunteer</h1>
                <p>We appreciate your interest. How may we get in touch?</p>
            </header>
            {serverError && (
                <section className="server-error">
                    <h2>{serverError}</h2>
                </section>
            )}
            <form
                className="offer-help__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    labelText="Full Name"
                    errorMsg={errors.name && "Please enter your full name"}
                    placeholder="e.g. Jane Smith"
                    name="name"
                    ref={register({
                        required: true
                    })}
                />
                <FormField
                    labelText="Email Address"
                    errorMsg={errors.email && "Please enter your email"}
                    placeholder="e.g. jane.smith@gmail.com"
                    name="email"
                    type="email"
                    ref={register({
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/
                    })}
                />
                <FormField
                    labelText="Phone Number"
                    errorMsg={errors.phone && "Please enter your phone number"}
                    placeholder="e.g. (425) 555-2323"
                    name="phone"
                    type="tel"
                    ref={ref =>
                        ref &&
                        register(ref.inputElement, {
                            required: true,
                            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                        })
                    }
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
                />
                <FormField
                    labelText="Zip Code"
                    errorMsg={errors.zipcode && "Please enter your zip code"}
                    placeholder="e.g. 98263"
                    name="zipcode"
                    ref={register({
                        required: true
                    })}
                />

                <CtaButton
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                    {isSubmitting ? "One sec..." : "Sign Up"}
                </CtaButton>
            </form>

            <style jsx>
                {`
                    header {
                        margin-bottom: 2.4rem;
                    }

                    .server-error {
                        color: #e33451;
                        margin-bottom: 1.6rem;
                    }
                `}
            </style>
        </main>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Volunteer" }
    };
}

export default OfferHelpPage;
