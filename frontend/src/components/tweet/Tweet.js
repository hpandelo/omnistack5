import React from 'react';
import likeSVG from "./TweetLike.svg";
import './Tweet.css';
import API from '../../services/api';
import Routes from '../../Routes';

export default function Tweet(props) {
  const { content, author, likes, _id } = props.data;

  const handleLike = async () => {
    await API.post(`${Routes.API.LIKES}/${_id}`);
  }

  return (
    <li className="tweet">
      <strong>{ author }</strong>
      <p>{ content }</p>
      <button 
        type="button"
        onClick={ handleLike }>
        <img src={ likeSVG } alt="Like" />
        { likes }
      </button>
    </li>
  );
}
