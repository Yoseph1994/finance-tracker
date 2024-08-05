import AddTrancations from "@/components/AddTrancations";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import Income from "@/components/Income";
import TransactionList from "@/components/TransactionList";
import { checkUser } from "@/utils/checkUsers";

async function Home() {
  const user = await checkUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <Income />
      <Balance />
      <AddTrancations />
      <TransactionList />
    </main>
  );
}

export default Home;
