import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';

interface Request {
  userId: string;
  content: string;
  parentId?: string;
}

export async function postTweet({
  userId,
  content,
  parentId,
}: Request): Promise<void> {
  if (content.length > 240) {
    throw new Error('Tweet length must be less than 240 characters');
  }

  const tweetCreateData: Prisma.TweetCreateArgs = {
    data: {
      from: {
        connect: {
          id: userId,
        },
      },
      content,
    },
  };

  if (parentId) {
    tweetCreateData.data.responseFrom = {
      connect: {
        id: parentId,
      },
    };
  }

  await prisma.tweet.create(tweetCreateData);
}
