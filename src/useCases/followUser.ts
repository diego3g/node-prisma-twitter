import { prisma } from '../database/prisma';

interface Request {
  userId: string;
  targetId: string;
}

export async function followUser({ userId, targetId }: Request): Promise<void> {
  await prisma.userFollows.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      target: {
        connect: {
          id: targetId,
        },
      },
    },
  });
}
