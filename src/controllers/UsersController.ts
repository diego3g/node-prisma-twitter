import { Request, Response } from 'express';
import { register } from '../useCases/register';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = request.body;

    const tokenAndUserData = await register({
      name,
      username,
      email,
      password,
    });

    return response.json(tokenAndUserData);
  }
}
