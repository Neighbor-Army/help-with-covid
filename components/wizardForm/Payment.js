/* eslint react/prop-types: 0 */
import React from "react";

import ItemForm from "./ItemForm";
import { PaymentDrop } from "./DropDowns";

const Payment = ({ setForm, formData, navigation }) => {
    const { payment, note } = formData;
    const { previous, go } = navigation;

    return (
        <div className="form">
            <h3>I prefer to pay with</h3>
            <PaymentDrop
                label="Payment"
                name="payment"
                value={payment}
                onChange={setForm}
            />
            <h3>Note for my volunteer</h3>
            <ItemForm name="note" value={note} onChange={setForm} />

            <div>
                <button onClick={previous}>Previous</button>
                <button onClick={() => go("submit")}>Submit</button>
            </div>
        </div>
    );
};

export default Payment;
