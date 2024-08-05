import { SignInButton } from "@clerk/nextjs";

export default function Guest() {
  return (
    <div className="guest">
      <h1>Welcome</h1>
      <p>Please signin to manage your transaction</p>
      <SignInButton />
    </div>
  );
}
