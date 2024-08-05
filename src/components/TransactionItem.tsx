"use client";
import { deleteTrancn } from "@/actions/transactions.action";
import { Transaction } from "@/types/transaction";
import { addCommas } from "@/utils/addCommas";
import { toast } from "react-toastify";

type TransactionItemProps = {
  transaction: Transaction;
};
export default function TransactionItem({ transaction }: TransactionItemProps) {
  async function handleDeleteTrancn(id: string) {
    const { error, message } = await deleteTrancn(id);

    if (error) return toast.error(error);
    toast.success(message);
  }

  const sign = transaction.amount > 0 ? "+" : "-";
  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text}
      <span>
        {sign} {addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => handleDeleteTrancn(transaction.id)}
      >
        ❌
      </button>
      {/* <h2>Transaction Item</h2>

      <p>Description: Transaction Description</p>
      <p>Amount: $100.00</p>
      <p>Date: 2022-01-01</p>
      <button>Delete</button>
      <hr />
      <br /> */}
    </li>
  );
}
