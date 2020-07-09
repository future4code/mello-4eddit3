import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import LikePost from '../../components/LikePost';

const baseUrl =
  'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

const axiosConfig = {
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzQ4ODN9.di53KPU1eEqj6puLM4crxO6jacyt9-5KY_FvkahY9Ws',
  },
};

// const token = localStorage.getItem("token");

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    text: '',
    title: '',
  });

  //state to update the page when creating a new post:
  const [reload, setReload] = useState([]);

  const history = useHistory();

  //////////TOKEN VALIDATION
  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token === null) {
  //     history.push('/login');
  //   }
  // }, [history]);

  //////////GO TO '/post:id' ROUTE
  // const goToPostDetails = (postId) => {
  //   let a = history.push(`/posts/${postId}`);

  //   console.log(a);
  // };

  ////////INPUTS VALUES
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  ////////GET POSTS

  const getPosts = () => {
    axios
      .get(`${baseUrl}`, axiosConfig)
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  /////////POST CREATE

  const createNewPost = async (event) => {
    event.preventDefault();

    const body = {
      text: form.text,
      title: form.title,
    };

    try {
      const response = await axios.post(`${baseUrl}`, body, axiosConfig);
      // console.log(response);
      alert('Post criado com sucesso!');
      setForm({
        text: '',
        title: '',
      });

      const data = [...posts, body];
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPosts = posts.map((post) => {
    return (
      <div key={post.id}>
        <Link to={`/posts/${post.id}`}>
          <div>
            <h4>{post.username}</h4>

            <h5>{post.title}</h5>
            <p>{post.text}</p>
            <div>
              <span>{post.votesCount} curtidas</span>
              <span>{post.commentsCount} comentários</span>
            </div>
            <LikePost idPost={post.id} />
          </div>
        </Link>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={createNewPost}>
        <label>Escreva seu posto:</label>

        <input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          type="text"
          required
          placeholder="Título do seu post"
        />

        <input
          name="text"
          value={form.text}
          onChange={handleInputChange}
          type="text"
          required
          placeholder="Texto do seu post"
        />
        <button>Postar</button>
      </form>

      {renderPosts}
    </div>
  );
};

export default Feed;
