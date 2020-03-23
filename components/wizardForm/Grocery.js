/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Grocery = props => {
    const { register, errors } = useForm();
    console.log(errors);

    const [formData, setFormData] = useState({
        item: "",
        quantity: "",
        canSubstitute: ""
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h3>grocery form</h3>
            <form>
                <input
                    type="text"
                    placeholder="item"
                    name="item"
                    onChange={handleChange}
                    value={formData.item}
                    ref={register}
                />
                <input
                    type="number"
                    placeholder="qty"
                    onChange={handleChange}
                    name="quantity"
                    value={formData.quantity}
                    ref={register}
                />
                <button>Add to bag</button>
                <input
                    type="checkbox"
                    placeholder="canSubstitute"
                    onChange={handleChange}
                    name="canSubstitute"
                    value={formData.canSubstitute}
                    ref={register}
                />{" "}
                Let a Volunteer choose a substitute if this item is out of stock
                <h4>Items</h4>
                <h4>Quantity</h4>
                <button
                    onClick={() =>
                        props.onSubmit(props.id, formData, props.id - 1)
                    }
                >
                    previous
                </button>
                <button
                    onClick={() =>
                        props.onSubmit(props.id, formData, props.id + 1)
                    }
                >
                    next
                </button>
            </form>
        </>
    );
};

export default Grocery;
