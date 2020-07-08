import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const axiosConfig = {
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzQ4ODN9.di53KPU1eEqj6puLM4crxO6jacyt9-5KY_FvkahY9Ws',
  },
};

const baseUrl =
  'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

function Postdetail() {
  const [postDetail, setPostDetail] = useState({});
  // const history = useHistory();

  const postId = useParams();

  // // ///////view tha page just wtith token
  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token === null) {
  //     history.push('/login');
  //   }
  // }, [history]);

  // //////get details post

  useEffect(() => {
    const getDetails = async (id) => {
      // const token = localStorage.getItem('token');
      // console.log(postId);
      try {
        const response = await axios.get(
          `${baseUrl}/${postId.id}`,
          axiosConfig
        );
        console.log(response.data.post);
        setPostDetail(response.data.post);
      } catch (error) {
        console.log(error);
        alert('erro ao abrir o post');
      }
    };
    getDetails(postId);
  }, [postId]);

  return (
    <div>
      <div>
        <h4>{postDetail.username}</h4>
        <h5>{postDetail.text}</h5>
        <span>{postDetail.votesCount}</span>

        <span>{postDetail.commentsCount} comentários</span>
      </div>

      <form>
        <input
          name="text"
          value={''}
          onChange={''}
          type="text"
          required
          placeholder="Comentário"
        />

        <button>ENVIAR COMENTÁRIO</button>
      </form>
    </div>
  );
}

export default Postdetail;
