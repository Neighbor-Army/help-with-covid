/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Contact from "./Contact";
import Grocery from "./Grocery";
import Payment from "./Payment";

const WizardForm = () => {
    const { errors } = useForm();
    console.log(errors);

    const [state, setState] = useState({
        step: 1,
        name: "",
        phone: "",
        address: "",
        apt: "",
        item:""
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
  const handleChange = e => {
    setState({...state,[e.target.name]:e.target.value});
  };

    const { step } = state;

    switch (step) {
        case 1:
            return (
                <Contact
                    nextStep={nextStep}
                    handleChange={handleChange}
                    state={state}
                />
            );
        case 2:
            return (
                <Grocery
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    state={state}
                />
            );
        case 3:
            return (
                <Payment
                    nextStep={nextStep}
                    prevStep={prevStep}
                    state={state}
                />
            );
        //   case 4:
        //     return <Success />;
    }
};

export default WizardForm;
