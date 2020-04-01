import React, { useState, useEffect } from 'react';
import socket from "socket.io-client";
import twiterLogo from '../twitter.svg';
import './Timeline.css';
import API from '../services/api';
import Tweet from '../components/tweet/Tweet';
import routes from '../Routes';

export default function Timeline() {
  const [ newTweet, setNewTweet ] = useState('');
  const [ tweetList, setTweetList ] = useState([]);
  
  const fetchedList = [];
  const io = socket(routes.API.URL);

  const fetchTweets = () => {
    const callApi = async () => {
      console.log("Fetching data from API...");
      const response = await API.get(routes.API.TWEETS);
      fetchedList.push(...response.data);

      setTweetList(fetchedList);
    };

    callApi();
  };

  const newTweetReceivedHandler = (data) => {
    console.log("New Tweet Received:", data, tweetList);
    setTweetList([ data, ...tweetList ])
  };

  const newLikeReceivedHandler = (data) => {
    console.log("New Like Received:", data, tweetList);
    setTweetList(tweetList.map(tweet => tweet._id === data._id ? data : tweet))
  };

  const registerLikeEvents = () => {
    console.log("registerLikeEvents");
    io.on('like', newLikeReceivedHandler);

    return () => {
      console.log("unregister like");
      io.off('like', newLikeReceivedHandler);
    };
  }

  const registerTweetEvents = () => {
    console.log("registerTweetEvents");
    io.on('tweet', newTweetReceivedHandler);

    return () => {
      console.log("unregister tweet");
      io.off('tweet', newTweetReceivedHandler);
    };
  }

  useEffect(fetchTweets, []);
  useEffect(registerTweetEvents, [tweetList]);
  useEffect(registerLikeEvents, [tweetList]);
  // useEffect(onLoadEffect, []);

  const handleNewTweet = async (e) => {
    const ENTER_KEY = 13;

    if (e.keyCode !== ENTER_KEY) return;
    console.log("handleNewTweet");

    const author = localStorage.getItem('@GoTwitter:username');
    await API.post(routes.API.TWEETS, { content: newTweet, author });
    setNewTweet('');
  }

  return (
    <div className="timeline-wrapper">
      <img src={ twiterLogo } alt="Twitter Logo" />
      <form>
        <textarea 
          value={ newTweet }
          onChange={ e => setNewTweet(e.target.value) }
          onKeyDown={ handleNewTweet }
          placeholder="O que está acontecendo?"
        />
      </form>
      <ul className="tweet-list">
        { tweetList.map(
          tweet => <Tweet data={ tweet } key={ tweet._id } />) }
      </ul>
      
    </div>
  );
}
