/* eslint react/prop-types: 0 */
import React from "react";
import { useForm } from "react-hook-form";

const Contact = props => {
    const { register, errors } = useForm();
    console.log(errors);

    return (
        <>
            <h3>Contact Info</h3>
            <form>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    ref={register({ required: true, maxLength: 80 })}
                />
                <input
                    type="tel"
                    placeholder="phone"
                    name="phone"
                    ref={register({ required: true, maxLength: 12 })}
                />
                <input
                    type="text"
                    placeholder="address"
                    name="address"
                    ref={register({ required: true })}
                />
                <input
                    type="text"
                    placeholder="apartment"
                    name="apartment"
                    ref={register}
                />
                <button onClick={() => props.nextStep()}>next</button>
            </form>
        </>
    );
};

export default Contact;
