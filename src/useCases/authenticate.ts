import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { prisma } from '../database/prisma';
import { auth } from '../config/auth';

interface Request {
  username: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

export async function authenticate({
  username,
  password,
}: Request): Promise<Response> {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error('Username not found.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Password does not match.');
  }

  const token = jwt.sign({}, auth.secret, {
    expiresIn: '60m',
    subject: user.id,
  });

  return {
    token,
    user,
  };
}
