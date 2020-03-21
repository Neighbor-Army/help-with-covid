import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RequestForm = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {
        console.log(data);
        axios
            .post(
                "http://localhost:5001/neighbor-army/us-central1/widgets/task",
                {
                    address: {
                        apartment: "",
                        state: "Michigan",
                        postalCode: "48067",
                        country: "United States",
                        city: "Royal Oak",
                        street: "Main st",
                        number: "922",
                        unparsed: "922 N Main st Royal Oak, MI 48067"
                    },
                    person: {
                        name: "joe ",
                        phone: "+14133333333"
                    },
                    notes: "notes"
                }
            )
            .then(data => console.log(data));
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="Name"
                        name="name"
                        ref={register({ required: true, maxLength: 20 })}
                    ></input>
                </div>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="Phone"
                        name="phone"
                        ref={register({
                            required: true,
                            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                        })}
                    ></input>
                    {errors.phone && (
                        <p className="form__error">
                            Please enter a valid phone
                        </p>
                    )}
                </div>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="Address"
                        name="address"
                        ref={register({ required: true, maxLength: 20 })}
                    ></input>
                </div>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="City"
                        name="city"
                        ref={register({ required: true, maxLength: 20 })}
                    ></input>
                </div>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="State"
                        name="state"
                        ref={register({ required: true, maxLength: 20 })}
                    ></input>
                </div>
                <div className="form__field">
                    <input
                        className="form__field--input"
                        placeholder="Zip Code"
                        name="zip"
                        ref={register({ required: true, maxLength: 20 })}
                    ></input>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default RequestForm;
