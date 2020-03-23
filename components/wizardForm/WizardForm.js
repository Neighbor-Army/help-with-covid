/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ContactNew from "./Contact";
import GroceryNew from "./Grocery";
import PaymentNew from "./Payment";

const WizardForm = () => {
    const { errors } = useForm();
    console.log(errors);

    const [state, setState] = useState({
        step: 1,
        name: "",
        phone: "",
        address: "",
        apt: ""
    });

    // Proceed to next step
    const nextStep = () => {
        setState({
            step: step + 1
        });
    };

    // Go back to prev step
    const prevStep = () => {
        setState({
            step: step - 1
        });
    };
    1;

    // Handle fields change
    const handleChange = input => e => {
        setState({ [input]: e.target.value });
    };
    const { step } = state;
    const { name, phone, address, apt } = state;
    const values = { name, phone, address, apt };

    switch (step) {
        case 1:
            return (
                <ContactNew
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 2:
            return (
                <GroceryNew
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 3:
            return (
                <PaymentNew
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={values}
                />
            );
        //   case 4:
        //     return <Success />;
    }
};

export default WizardForm;
