import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma';

interface Request {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function register({
  name,
  email,
  username,
  password,
}: Request): Promise<void> {
  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      OR: {
        email,
        username,
      },
    },
  });

  if (userAlreadyExists) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  });
}
