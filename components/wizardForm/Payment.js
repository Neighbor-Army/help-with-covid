/* eslint react/prop-types: 0 */
import React from "react";
import { useForm } from "react-hook-form";

const Payment = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log("data", data);
    console.log(errors);

    return (
        <>
            <h3>Payment info</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button onClick={() => props.prevStep()}>previous</button>
                <input type="submit" />
            </form>
        </>
    );
};

export default Payment;
