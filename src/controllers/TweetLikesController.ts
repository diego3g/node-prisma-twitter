import { Request, Response } from 'express';
import { likeTweet } from '../useCases/likeTweet';

export class TweetLikesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { tweetId } = request.params;
    const userId = request.user.id;

    await likeTweet({ tweetId, userId });

    return response.status(201).send();
  }
}
