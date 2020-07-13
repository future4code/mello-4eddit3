import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';

import { initialState, VoteReducers } from './Reducers/VoteReducers';
import VotesCommentContext from './contexts/VotesCommentContext';

function App() {
  const [state, dispatch] = useReducer(VoteReducers, initialState);

  return (
    <BrowserRouter>
      <VotesCommentContext.Provider
        value={{ comments: state.comments, dispatch: dispatch }}
      >
        <Routes />
        <GlobalStyle />
      </VotesCommentContext.Provider>
    </BrowserRouter>
  );
}

export default App;
