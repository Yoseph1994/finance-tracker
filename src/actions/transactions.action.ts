"use server";

import { Transaction } from "@/types/transaction";
import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { string } from "zod";

type TransactionData = {
  text: string;
  amount: number;
};
type TransactionResult = {
  data?: TransactionData;
  error?: string;
};

type Balance = {
  balance?: number;
  error?: string;
};

type IncomeExpense = {
  income?: number;
  expense?: number;
  error?: string;
};

export async function AddTransaction(
  formData: FormData
): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amtValue = formData.get("amount");

  if (!textValue || textValue === "" || !amtValue) {
    return { error: "Text or Amount Missing" };
  }

  const text = textValue.toString();
  const amount = parseFloat(amtValue.toString());

  //get loggedin user
  const { userId } = await auth();

  if (!userId) return { error: "No user found" };

  try {
    const transactionData: TransactionData = await prisma.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");
    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
}

export async function getUserBalance(): Promise<Balance> {
  const { userId } = await auth();
  if (!userId) return { error: "No user found" };

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    // here use reduce fn to find total
    const balance = transactions
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toFixed(2);

    return { balance: parseFloat(balance) };
  } catch (error) {
    return { error: "error.message " };
  }
}

export async function getIncomeExpense(): Promise<IncomeExpense> {
  const { userId } = await auth();
  if (!userId) return { error: "No user found" };

  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    const amounts: number[] = transaction.map((transaction) => {
      return transaction.amount;
    });

    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((acc, amount) => acc + amount, 0);

    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => acc + amount, 0);

    return {
      expense: Math.abs(expense),
      income,
    };
  } catch (error) {
    return { error: "In server action getIncome" };
  }
}

export async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  try {
    const { userId } = await auth();
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Check if transactions array is empty
    if (transactions.length === 0) {
      return { error: "No transactions found" };
    }

    return { transactions }; // No error, return transactions
  } catch (error) {
    console.error(error); // Optionally log the error for debugging purposes
    return { error: "Error in fetching transactions" };
  }
}

export async function deleteTrancn(id: string) {
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch (error) {}
}
