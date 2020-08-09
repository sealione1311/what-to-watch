import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.STATE;

export const getCurrentMovie = (state) => state[NAME_SPACE].currentMovie;

export const getPlayingMovie = (state) => state[NAME_SPACE].playingMovie;

export const getActiveGenre = (state) => state[NAME_SPACE].currentGenre;

export const getDisplayedFilmsCount = (state) => state[NAME_SPACE].displayedFilmsCount;

export const getSignInStatus = (state) => state[NAME_SPACE].authScreen;
