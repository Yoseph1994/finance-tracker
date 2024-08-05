import { getUserBalance } from "@/actions/transactions.action";
import { addCommas } from "@/utils/addCommas";
import { toast } from "react-toastify";

async function Balance() {
  const { balance, error } = await getUserBalance();

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <h4>Your balance</h4>
      <h2>ETB {addCommas(balance ?? 0)}</h2>
    </>
  );
}

export default Balance;
