import { getTransactions } from "@/actions/transactions.action";
import { json } from "stream/consumers";
import TransactionItem from "./TransactionItem";
import { toast } from "react-toastify";

async function TransactionList() {
  const { transactions, error } = await getTransactions();

  if (error) return toast.error(error);
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions &&
          transactions?.map((transaction) => {
            return (
              <TransactionItem key={transaction.id} transaction={transaction} />
            );
          })}
      </ul>
    </>
  );
}

export default TransactionList;
