/* eslint react/prop-types: 0 */
import React from "react";
import { useForm } from "react-hook-form";

const Contact = props => {
    const { name, phone, address,apt, handleChange } = props;
    const { register, errors } = useForm();
    console.log(errors);
    console.log('contactprops',props)

    return (
        <>
            <h3>Contact Info</h3>
            <form>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={e => handleChange(e)}
                    ref={register({ required: true, maxLength: 80 })}
                />
                <input
                    type="tel"
                    placeholder="phone"
                    name="phone"
                    value={phone}
                    onChange={e => handleChange(e)}
                    ref={register({ required: true, maxLength: 12 })}
                />
                <input
                    type="text"
                    placeholder="address"
                    name="address"
                    value={address}
                    onChange={e => handleChange(e)}
                    ref={register({ required: true })}
                />
                <input
                    type="text"
                    placeholder="apartment"
                    name="apt"
                    value={apt}
                    onChange={e => handleChange(e)}
                    ref={register}
                />
                <button onClick={() => props.nextStep()}>next</button>
            </form>
        </>
    );
};

export default Contact;
