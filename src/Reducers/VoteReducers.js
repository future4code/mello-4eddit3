export const initialState = {
  likeComments: {},
  userVotesCount: {},
};

export const VoteReducers = (state, action) => {
  switch (action.type) {
    case 'LIKE_COMMENT':
      return {
        ...state,
        likeComments: action.payload.VotesCount,
        userVotesCount: action.payload.userVote,
      };

    case 'DISLIKE_COMMENT':
      return {
        ...state,
        likeComments: action.payload.VotesCount,
        userVotesCount: action.payload.userVote,
      };
  }
  return state;
};
