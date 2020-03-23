/* eslint react/prop-types: 0 */
import React from "react";
import { useForm } from "react-hook-form";

const Grocery = props => {
    const { register, errors } = useForm();
    console.log(errors);

    return (
        <>
            <h3>grocery form</h3>
            <form>
                <input
                    type="text"
                    placeholder="item"
                    name="item"
                    ref={register}
                />
                <input
                    type="number"
                    placeholder="qty"
                    name="qty"
                    ref={register}
                />
                <button>Add to bag</button>
                <input
                    type="checkbox"
                    placeholder="canSubstitute"
                    name="canSubstitute"
                    ref={register}
                />{" "}
                Let a Volunteer choose a substitute if this item is out of stock
                <h4>Items</h4>
                <h4>Quantity</h4>
                <button onClick={() => props.prevStep()}>previous</button>
                <button onClick={() => props.nextStep()}>next</button>
            </form>
        </>
    );
};

export default Grocery;
