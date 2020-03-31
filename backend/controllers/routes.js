import express from 'express';
import { RoutesConstants } from '../routes.js';
import LikeController from './like/LikeController.js';
import TweetController from './tweet/TweetController.js';

const TweeterRoutes = express.Router();

TweeterRoutes.get(RoutesConstants.PUBLIC.Tweets, TweetController.index);
TweeterRoutes.post(RoutesConstants.PUBLIC.Tweets, TweetController.store);

TweeterRoutes.post(RoutesConstants.PUBLIC.Likes, LikeController.store);

export default TweeterRoutes;
