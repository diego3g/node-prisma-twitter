import { Request, Response } from 'express';
import { postTweet } from '../useCases/postTweet';

export class TweetsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const userId = request.user.id;

    await postTweet({ content, userId });

    return response.status(201).send();
  }
}
