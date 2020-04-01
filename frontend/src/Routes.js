const API_URL = '192.168.0.100:3001';

export default {
  LOGIN: '/',
  TIMELINE: '/timeline',
  API: {
    URL: `http://${API_URL}`,
    SOCKETURL: `ws://${API_URL}`,
    TWEETS: `tweets`,
    LIKES: `likes`,
  },
}