"use client";

import { AddTransaction } from "@/actions/transactions.action";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function AddTrancations() {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const { data, error } = await AddTransaction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("transaction completed");
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
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
