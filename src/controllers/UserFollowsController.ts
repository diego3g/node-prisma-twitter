import { Request, Response } from 'express';
import { followUser } from '../useCases/followUser';

export class UserFollowsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId: targetId } = request.params;
    const userId = request.user.id;

    await followUser({
      userId,
      targetId,
    });

    return response.status(201).send();
  }
}
