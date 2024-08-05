"use client";
export default function AddTrancations() {
  const clientAction = async (formData: FormData) => {
    console.log(formData);
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form action={clientAction}></form>
    </div>
  );
}
