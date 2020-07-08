export const initialState = {
  likeComments: 0,
  dislikeComments: 0,
  likePosts: 0,
  dislikePosts: 0,
};

export const VoteReducers = (state, action) => {
  switch (action.type) {
    case 'LIKE_COMMENTS':
      return { ...state, likeComments: state.likeComments + 1 };

    case 'DISLIKE_COMMENTS':
      return { ...state, dislikeComments: state.dislikeComments + 1 };

    case 'LIKE_POSTS':
      return { ...state, likePosts: state.likePosts + 1 };

    case 'DISLIKE_POSTS':
      return { ...state, dislikePosts: state.dislikePosts + 1 };
  }
  return state;
};
