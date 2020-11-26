import { Request, Response } from 'express';
import { getTweetsFromUserFollows } from '../useCases/getTweetsFromUserFollows';

export class FollowingTweetsController {
  async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { tweets } = await getTweetsFromUserFollows({ userId });

    return response.status(200).json(tweets);
  }
}
