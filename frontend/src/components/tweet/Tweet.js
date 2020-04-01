import React from 'react';
import likeSVG from "./TweetLike.svg";
import deleteSVG from "./TweetDelete.svg";
import './Tweet.css';
import API from '../../services/api';
import Routes from '../../Routes';

export default function Tweet(props) {
  const username = localStorage.getItem('@GoTwitter:username');

  const { content, author, likes, _id } = props.data;

  const handleLike = async () => {
    await API.post(`${Routes.API.LIKES}/${_id}`);
  }

  const handleDelete = async () => {
    await API.delete(`${Routes.API.TWEETS}/${_id}`);
  }

  return (
    <li className="tweet">
      <strong>{ author }</strong>
      <p>{ content }</p>

      { (author === username) ?
        (<button 
          type="button"
          className="deleteButton"
          onClick={ handleDelete }>
          <img src={ deleteSVG } alt="Delete" />
        </button>) : <></> }
      <button 
        type="button"
        onClick={ handleLike }>
        <img src={ likeSVG } alt="Like" />
        { likes }
      </button>
    </li>
  );
}
