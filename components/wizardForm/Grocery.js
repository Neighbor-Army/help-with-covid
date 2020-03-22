/* eslint react/prop-types: 0 */
import React from "react";

import ItemForm from "./ItemForm";

const Grocery = ({ setForm, formData, navigation }) => {
    const { grocery, qty } = formData;

    const { previous, next } = navigation;

    return (
        <div className="form">
            <h3>My Grocery List</h3>
            <ItemForm
                label="Grocery"
                name="grocery"
                value={grocery}
                onChange={setForm}
            />
            <ItemForm label="qty" name="qty" value={qty} onChange={setForm} />
            <button>Add to Bag</button>

            <div>
                <button onClick={previous}>Previous</button>
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default Grocery;
