import AddTrancations from "@/components/AddTrancations";
import Guest from "@/components/Guest";
import { checkUser } from "@/utils/checkUsers";

async function Home() {
  const user = await checkUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <AddTrancations />
    </main>
  );
}

export default Home;
