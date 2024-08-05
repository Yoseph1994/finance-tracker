import { checkUser } from "@/utils/checkUsers";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

async function Header() {
  const user = await checkUser();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Expense Tracker</h2>
        <div className="">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Header;
