/* eslint react/prop-types: 0 */
import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Contact from "./Contact";
import Grocery from "./Grocery";
import Payment from "./Payment";
import Submit from "./Submit";

import "./wizardFormStyles.css";

const steps = [
    { id: "contact" },
    { id: "grocery" },
    { id: "payment" },
    { id: "submit" }
];

const defaultData = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    grocery: "",
    qty: "",
    note: "",
    payment: ""
};

const WizardForm = () => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, navigation };

    switch (id) {
        case "contact":
            return <Contact {...props} />;
        case "grocery":
            return <Grocery {...props} />;
        case "payment":
            return <Payment {...props} />;
        case "submit":
            return <Submit {...props} />;
        default:
            return null;
    }
};

export default WizardForm;
