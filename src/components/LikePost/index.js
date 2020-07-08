import React, {useState} from 'react';
import axios from 'axios';

const baseUrl =
  'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

const axiosConfig = {
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTE5OTUwNzh9.731E3J4det25w8gNhWzU1dv4WXBUskbV4EzSiQKkkz4
`},
};


// import { Container } from './styles';

const LikePost = (props) => {
    const [vote,setVote] = useState({direction:0})

    const countLike = async ()=>{
      const body ={
        direction: +1
      }
      try {
        const response = await axios.put(`${baseUrl}/${props.idPost}/vote`,body, axiosConfig)
        console.log(response);
        setVote({direction: +1});
      }
      catch (err) {
        console.log(err);
      }
    };
    const countDisLike = async ()=>{
      const body ={
        direction: -1
      }
      try {
        const response = await axios.put(`${baseUrl}/${props.idPost}/vote`,body, axiosConfig)
        console.log(response);
        setVote({direction:-1});
      }
      catch (error) {
        console.log(error);
      }
    };
    const myProps = props.idPost
    console.log(myProps);
  return (
      <div >
        <button onClick={countLike}>Like</button>
        {vote.direction}
        <button onClick={countDisLike}>Dislike</button>

      </div> 
  
  );
}

export default LikePost;