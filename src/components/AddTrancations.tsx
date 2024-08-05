"use client";

import { useForm } from "react-hook-form";

export default function AddTrancations() {
  const clientAction = async (formData: FormData) => {
    console.log(formData);
  };

  const { register, handleSubmit } = useForm();
  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount (positive for income, negative for expense)
          </label>
          <input
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            placeholder="Enter Amount..."
          />
        </div>
        <button className="btn" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}
