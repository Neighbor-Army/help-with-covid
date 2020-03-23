/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Contact from "./Contact";
import Grocery from "./Grocery";
import Payment from "./Payment";

const WizardForm = () => {
    const { errors } = useForm();
    console.log(errors);

    const [formData, setFormData] = useState();

    const [steps, setSteps] = useState(1);

    const navigate = (stepId, data, destinationId) => {
        setFormData({
            ...formData,
            [stepId]: data
        });
        setSteps(destinationId);
    };
    console.log("data", formData);

    switch (steps) {
        case 1:
            return <Contact id={1} onSubmit={navigate} />;
        case 2:
            return <Grocery id={2} onSubmit={navigate} />;
        case 3:
            return <Payment id={3} onSubmit={navigate} />;
        //   case 4:
        //     return <Success />;
    }
};

export default WizardForm;
