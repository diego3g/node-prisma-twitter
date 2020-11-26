import { prisma } from '../database/prisma';

interface Request {
  userId: string;
  tweetId: string;
}

export async function likeTweet({ userId, tweetId }: Request): Promise<void> {
  await prisma.tweetLikes.create({
    data: {
      tweet: {
        connect: {
          id: tweetId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
