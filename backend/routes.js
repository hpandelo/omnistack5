import express from 'express';

const RoutesConstants = {
  PRIVATE: {
    SERVER_PORT: '3001',
    MONGODB: 'mongodb+srv://hp:hp@sandbox-xbyq4.gcp.mongodb.net/test?retryWrites=true&w=majority',
  },
  PUBLIC: {
    ROOT: '/',
    Tweets: '/tweets',
    Likes: '/likes/:id',
  }
};

const BaseRoutes = express.Router();

BaseRoutes.get(RoutesConstants.PUBLIC.ROOT, (req, res) => {
  return res.send('Hello World');
});

export { RoutesConstants, BaseRoutes };
