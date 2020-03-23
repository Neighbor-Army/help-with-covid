/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = props => {
    const { register, errors } = useForm();
    console.log(errors);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        apt: ""
    });

    // Handle fields change
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(props.id, formData, props.id + 1);
    };

    return (
        <>
            <h3>Contact Info</h3>
            <form onSubmit={handleSubmit}>
                {errors.name && 'First name is required'}
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    ref={register({ required: true, maxLength: 80 })}
                />
                <input
                    type="tel"
                    placeholder="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    ref={register({ required: true, maxLength: 12 })}
                />
                {errors.phone && 'phone number is required'}
                <input
                    type="text"
                    placeholder="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    ref={register({ required: true })}
                />
                {errors.address && 'address is required'}
                <input
                    type="text"
                    placeholder="apartment"
                    name="apt"
                    value={formData.apt}
                    onChange={e => handleChange(e)}
                    ref={register}
                />
                <button>next</button>
            </form>
        </>
    );
};

export default Contact;
