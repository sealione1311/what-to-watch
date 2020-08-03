import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.STATE;

export const getCurrentSmallMovie = (state) => state[NAME_SPACE].currentSmallMovie;

export const getPlayingMovie = (state) => state[NAME_SPACE].playingMovie;

export const getActiveGenre = (state) => state[NAME_SPACE].currentGenre;

export const getDisplayedFilmsCount = (state) => state[NAME_SPACE].displayedFilmsCount;
