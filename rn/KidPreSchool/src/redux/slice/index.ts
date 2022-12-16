import { createSlice } from '../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';

import { PayloadAction } from '@reduxjs/toolkit';

import { Repo } from '../../types/Repo';
import { githubRepoFormSaga } from './saga';
import { GithubRepoFormState, RepoErrorType } from './types';

export const initialState: GithubRepoFormState = {
  idHome: '',
  repositories: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'githubRepoForm',
  initialState,
  reducers: {
    changeIdHome(state, action: PayloadAction<string>) {
      state.idHome = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useGithubRepoFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: githubRepoFormSaga });
  return { actions: slice.actions };
};
