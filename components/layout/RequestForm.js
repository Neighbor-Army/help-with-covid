import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RequestForm = () => {

  const { register, handleSubmit, setError, errors, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {errors.invalidCredentials && (
          <p className="form__error">{errors.invalidCredentials}</p>
        )}
        <div className="form__field">
          <input  className="form__field--input" placeholder="Name" name="name" ref={register({ required: true, maxLength: 20 })}></input>
        </div>
        <div className="form__field">
          <input  
          className="form__field--input" 
          placeholder="Phone" 
          name="phone" 
          ref={register({ required: true, pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ })}>
              
          </input>
          {errors.phone && (
              <p className="form__error">Please enter a valid phone</p>
            )}
        </div>
        <div className="form__field">
          <input  className="form__field--input" placeholder="Address" name="address" ref={register({ required: true, maxLength: 20 })}></input>
        </div>
        <div className="form__field">
          <input  className="form__field--input" placeholder="City" name="city" ref={register({ required: true, maxLength: 20 })}></input>
        </div>
        <div className="form__field">
          <input  className="form__field--input" placeholder="State" name="state" ref={register({ required: true, maxLength: 20 })}></input>
        </div>
        <div className="form__field">
          <input  className="form__field--input" placeholder="Zip Code" name="zip" ref={register({ required: true, maxLength: 20 })}></input>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default RequestForm;
