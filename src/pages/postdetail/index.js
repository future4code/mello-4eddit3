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
  const [comments, setComments] = useState([]);

  const [form, setForm] = useState({
    text: '',
  });

  ////////INPUTS VALUES
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  //click Id
  const postId = useParams();

  // // ///////view tha page just wtith token [TIRAR ISSO]
  // const history = useHistory();
  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token === null) {
  //     history.push('/login');
  //   }
  // }, [history]);

  //////get details post

  useEffect(() => {
    getDetails(postId);
  }, []);

  const getDetails = async (id) => {
    // const token = localStorage.getItem('token');
    // console.log(postId);
    try {
      const response = await axios.get(`${baseUrl}/${postId.id}`, axiosConfig);
      console.log('a');
      setPostDetail(response.data.post);
      setComments(response.data.post.comments);
    } catch (error) {
      console.log(error);
      alert('erro ao abrir o post');
    }
  };

  ////creaste new comment
  const createNewComment = async (event) => {
    event.preventDefault();

    const body = {
      text: form.text,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/${postId.id}/comment`,
        body,
        axiosConfig
      );
      console.log(response);
      alert('Comment enviado com sucesso!');
      setForm({
        text: '',
      });
      const data = [...comments, body];
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const commentsList = comments.map((comment) => {
    return (
      <div>
        <li> {comment.text}</li>
      </div>
    );
  });
  return (
    <div>
      <div>
        <h4>{postDetail.username}</h4>
        <h5>{postDetail.text}</h5>
        <span>
          {postDetail.votesCount} Curtidas {''}
        </span>

        <span>{comments.length} comentários</span>
      </div>

      <form onSubmit={createNewComment}>
        <input
          name="text"
          value={form.text}
          onChange={handleInputChange}
          type="text"
          required
          placeholder="Comentário"
        />

        <button>ENVIAR COMENTÁRIO</button>
      </form>

      <div>{commentsList}</div>
    </div>
  );
}

export default Postdetail;
