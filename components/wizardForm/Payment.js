/* eslint react/prop-types: 0 */
import React from "react";
import { useForm } from "react-hook-form";

const Payment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log("data", data);
    console.log(errors);

    return (
        <>
            <h3>Payment info</h3>
            <h4>I prefer to pay with</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="payment type" ref={register({ required: true })}>
                    <option value="venmo">venmo</option>
                    <option value="paypal">paypal</option>
                    <option value="cash">cash</option>
                </select>
                <h4>Notes for my voluteer</h4>
                <input
                    type="text"
                    placeholder=""
                    name="notes"
                    ref={register}
                />

                <input type="submit" />
            </form>
        </>
    );
};

export default Payment;
