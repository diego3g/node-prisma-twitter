import { Router } from 'express';
import { authMiddleware } from './middlewares/auth';
import { SessionsController } from './controllers/SessionsController';
import { UsersController } from './controllers/UsersController';
import { TweetsController } from './controllers/TweetsController';
import { TweetLikesController } from './controllers/TweetLikesController';
import { TweetCommentsController } from './controllers/TweetCommentsController';
import { UserFollowsController } from './controllers/UserFollowsController';
import { FollowingTweetsController } from './controllers/FollowingTweetsController';

const routes = Router();

const sessionsController = new SessionsController();
const usersController = new UsersController();
const tweetsController = new TweetsController();
const tweetLikesController = new TweetLikesController();
const tweetCommentsController = new TweetCommentsController();
const userFollowsController = new UserFollowsController();
const followingTweetsController = new FollowingTweetsController();

routes.post('/sessions', sessionsController.create);
routes.post('/users', usersController.create);

routes.use(authMiddleware);

routes.post('/tweets', tweetsController.create);
routes.get('/tweets', followingTweetsController.index);
routes.post('/tweets/:tweetId/likes', tweetLikesController.create);
routes.post('/tweets/:tweetId/comments', tweetCommentsController.create);
routes.post('/users/:userId/follows', userFollowsController.create);

export default routes;
