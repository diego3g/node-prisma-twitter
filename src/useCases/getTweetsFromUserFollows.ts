import { Tweet } from '@prisma/client';
import { prisma } from '../database/prisma';

interface Request {
  userId: string;
}

interface Response {
  tweets: Tweet[];
}

export async function getTweetsFromUserFollows({
  userId,
}: Request): Promise<Response> {
  const tweets = await prisma.tweet.findMany({
    where: {
      from: {
        id: userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    tweets,
  };
}
