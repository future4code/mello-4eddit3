import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const baseUrl =
  'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

const axiosConfig = {
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzQ4ODN9.di53KPU1eEqj6puLM4crxO6jacyt9-5KY_FvkahY9Ws',
  },
};

// const token = localStorage.getItem("token");

const feed = () => {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    text: '',
    title: '',
  });

  const history = useHistory();

  //////////TOKEN VALIDATION
  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token === null) {
  //     history.push('/login');
  //   }
  // }, [history]);

  //////////GO TO '/post:id' ROUTE
  const goToPostDetails = (postId) => {
    history.push(`/post:id/${postId}`);
  };

  ////////INPUTS VALUES
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  ////////GET POSTS

  useEffect(() => {
    axios
      .get(`${baseUrl}`, {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzQ4ODN9.di53KPU1eEqj6puLM4crxO6jacyt9-5KY_FvkahY9Ws',
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
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
      console.log(response);
      alert('Post criado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = posts.map((post) => {
    return (
      <div>
        <h3>{post.username}</h3>
        <p onClick={() => goToPostDetails(post.id)}>{post.text}</p>
        <div>
          <span>{post.votesCount}</span>
          <span>{post.commentsCount}</span>
        </div>

        <hr />
      </div>
    );
  });

  return (
    <div>
      <form>
        <label>Escreva seu posto:</label>
        <input
          name="text"
          value={form.text}
          onChange={handleInputChange}
          type="text"
          required
          placeholder="Escreva o texto do seu post"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          type="text"
          required
          placeholder="Escreva o título do seu post"
        />
        <button>Postar</button>
      </form>
      {getPosts}
    </div>
  );
};

export default feed;
