/* eslint react/prop-types: 0 */
import React from "react";
import ItemForm from "./ItemForm";
import { CountryDrop, StateDrop } from "./DropDowns";

const Contact = ({ setForm, formData, navigation }) => {
    const {
        firstName,
        lastName,
        phone,
        address,
        apartment,
        country,
        city,
        state,
        zip
    } = formData;

    const { next } = navigation;

    return (
        <div className="form">
            <h3>Contact Info</h3>
            <ItemForm
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={setForm}
            />
            <ItemForm
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={setForm}
            />
            <ItemForm
                label="Phone"
                name="phone"
                value={phone}
                onChange={setForm}
            />
            <ItemForm
                label="Address"
                name="address"
                value={address}
                onChange={setForm}
            />
            <ItemForm
                label="apartment"
                name="apartment"
                value={apartment}
                onChange={setForm}
            />
            <ItemForm
                label="City"
                name="city"
                value={city}
                onChange={setForm}
            />
            <StateDrop
                label="State"
                name="state"
                value={state}
                onChange={setForm}
            />
            <CountryDrop
                label="Country"
                name="country"
                value={country}
                onChange={setForm}
            />
            <ItemForm label="Zip" name="zip" value={zip} onChange={setForm} />
            <div>
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default Contact;
