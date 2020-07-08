import React, { useContext, useReducer } from 'react';

import { VoteReducers, initialState } from '../../Reducers/VoteReducers';
// import { Container } from './styles';

function VoteComments() {
  const [state, dispatch] = useReducer(VoteReducers, initialState);

  const addLike = () => {
    dispatch({ type: 'LIKE_COMMENTS' });
  };
  const addDisLike = () => {
    dispatch({ type: 'DISLIKE_COMMENTS' });
  };

  return (
    <>
      <h4>Comments</h4>
      Likes:{state.likeComments - state.dislikeComments}
      <button onClick={() => addLike()}>Like</button>
      <button onClick={() => addDisLike()}>Dislike</button>
    </>
  );
}

export default VoteComments;
