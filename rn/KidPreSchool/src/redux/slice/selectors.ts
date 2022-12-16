import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { RootState } from '../../types/RootState';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state?.githubRepoForm || initialState;

export const selectIdHome = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.idHome,
);

export const selectIdMenu = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.idMenu,
);

export const selectImageDetail = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.imageDetail,
);

export const selectLoading = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  (githubRepoFormState) => githubRepoFormState.repositories,
);
