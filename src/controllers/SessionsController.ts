import { Request, Response } from 'express';
import { authenticate } from '../useCases/authenticate';

export class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const tokenAndUserData = await authenticate({
      username,
      password,
    });

    return response.json(tokenAndUserData);
  }
}
