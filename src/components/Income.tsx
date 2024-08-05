import { getIncomeExpense } from "@/actions/transactions.action";
import { addCommas } from "@/utils/addCommas";
import { toast } from "react-toastify";

async function Income() {
  const { error, expense, income } = await getIncomeExpense();

  if (error) return toast.error(error);
  return (
    <div className="inc-exp-container">
      <div className="">
        <h4>Income</h4>
        <p className="money plus">{addCommas(income ?? 0)}</p>
      </div>
      <div className="">
        <h4>Expense</h4>
        <p className="money minus">${addCommas(expense ?? 0)}</p>
      </div>
    </div>
  );
}

export default Income;
