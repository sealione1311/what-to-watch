export const adapterMovie = (movie) => {
  return {
    name: movie.name,
    genre: movie.genre,
    released: movie.released,
    backgroundImage: movie.background_image,
    poster: movie.poster_image,
    smallImage: movie.preview_image,
    id: movie.id,
    description: movie.description,
    rating: movie.rating,
    ratingCount: movie.scores_count,
    director: movie.director,
    starring: movie.starring,
    runTime: movie.run_time,
    preview: movie.preview_video_link,
    videoLink: movie.video_link,
    isFavorite: movie.is_favorite,
    backgroundColor: movie.background_color,
  };
};

export const createUser = (userInfo) => {
  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    avatarUrl: `https://4.react.pages.academy${userInfo.avatar_url}`,
  };
};
