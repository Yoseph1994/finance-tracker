import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  // check if user exists
  if (!user) return null;
  //check if the user is already in the database

  const userInDb = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (userInDb) return userInDb;

  // create user

  const newUser = await prisma.user.create({
    data: {
      clerkUserId: user.id,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      name: `${user.firstName} ${user.lastName}`,
    },
  });

  return newUser;
};
