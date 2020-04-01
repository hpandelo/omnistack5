import Tweet from "../../models/Tweet.js";

const TweetController = {
  async index(req, res) {
    const tweets = await Tweet.find({ }).sort('-createdAt');

    return res.json(tweets);
  },

  async exclude(req, res) {
    const tweet = { _id: req.params.id };
    tweet.dbResponse = await Tweet.deleteOne(tweet);

    console.log("Tweet Deleted:", tweet._id);
    req.io.emit('delete', tweet);
    return res.json(tweet);
  },

  async store(req, res) {
    const tweet = await Tweet.create(req.body);
    req.io.emit('tweet', tweet);

    return res.json(tweet);
  },
};

export default TweetController;
