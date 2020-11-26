import { Request, Response } from 'express';
import { postTweet } from '../useCases/postTweet';

export class TweetCommentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { tweetId } = request.params;
    const { content } = request.body;
    const userId = request.user.id;

    await postTweet({
      content,
      userId,
      parentId: tweetId,
    });

    return response.status(201).send();
  }
}
