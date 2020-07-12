import React, { useEffect, useState, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { VoteReducers, initialState } from '../../Reducers/VoteReducers';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import api from '../../services/api';

const token = localStorage.getItem('token');

const axiosConfig = {
  headers: {
    Authorization: token,
  },
};

function Postdetail() {
  const [state, dispatch] = useReducer(VoteReducers, initialState);
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

  //////get details post

  useEffect(() => {
    getDetails(postId);
  }, []);

  const getDetails = async (id) => {
    // const token = localStorage.getItem('token');
    // console.log(postId);
    try {
      const response = await api.get(`/${postId.id}`, axiosConfig);
      console.log('a');
      setPostDetail(response.data.post);
      setComments(response.data.post.comments);
    } catch (error) {
      console.log(error);
      alert('erro ao abrir o post');
    }
  };

  ////create new comment
  const createNewComment = async (event) => {
    event.preventDefault();

    const body = {
      text: form.text,
    };

    try {
      const response = await api.post(
        `/${postId.id}/comment`,
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

  const handleLikeComment = (votes) => {
    const body = {
      direction: 1,
    };

    const commentId = votes.id;

    if (votes.userVoteDirection === 0 || votes.userVoteDirection === -1) {
      api.put(`${postId.id}/comment/${commentId}/vote`, body, axiosConfig);
      const voteUp = (votes.votesCount += 1);
      const userVote = (votes.userVoteDirection += 1);

      dispatch({
        type: 'LIKE_COMMENTS',
        payload: { votesCount: voteUp, userVote },
      });
    } else {
      console.log('não foi possível votar');
    }
  };

  const handleDislikeComment = (votes) => {
    const body = {
      direction: -1,
    };

    const commentId = votes.id;

    if (votes.userVoteDirection === 0 || votes.userVoteDirection === 1) {
      api.out(`${postId}/comment/${commentId}/vote`, body, axiosConfig);
      const voteDown = (votes.votesCount -= 1);
      const userVote = (votes.userVoteDirection -= 1);

      dispatch({
        type: 'DISLIKE_COMMENTS',
        playload: { votesCount: voteDown, userVote },
      });
    } else {
      console.log('não foi possível o dislike');
    }
  };

  const commentsList = comments.map((comment) => {
    return (
      <div>
        <li> {comment.text}</li>
        <button onClick={handleLikeComment(comment)}>
          <AiFillLike />
        </button>

        <button onClick={handleDislikeComment(comment)}>
          <AiFillDislike />
        </button>
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
