/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Payment = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log("data", data);
    console.log(errors);

    const [formData, setFormData] = useState({
        paymentType: "",
        note: ""
    })
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h3>Payment info</h3>
            <h4>I prefer to pay with</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="payment type" value={formData.paymentType} onChange={handleChange} ref={register({ required: true })}>
                    <option value="venmo">venmo</option>
                    <option value="paypal">paypal</option>
                    <option value="cash">cash</option>
                </select>
                <h4>Notes for my volunteer</h4>
                <input type="text" placeholder="" name="note" value={formData.note} onChange={handleChange} ref={register} />
                <button onClick={() => props.onSubmit(props.id, formData, props.id - 1)}>previous</button>
                <button onClick={() => props.onSubmit(props.id, formData, props.id - 2)} >submit</button>
            </form>
        </>
    );
};

export default Payment;
