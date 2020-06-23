import { gql } from "apollo-boost";

export const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_TV_SERIES = gql`
  {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_CONTENTS = gql`
  {
    getContents {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
      tvSeries {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query getMovieById($movieId: ID!) {
    getMovieById(movie: { movieId: $movieId }) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_TV_BY_ID = gql`
  query getTvById($tvId: ID!) {
    getTvById(tv: { tvId: $tvId }) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addNewMovie($movie: InputMovie) {
    addMovie(movie: $movie) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TV_SERIES = gql`
  mutation addNewTvSeries($tv: InputTvSeries) {
    addTvSeries(tv: $tv) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($movieId: ID!) {
    deleteMovie(movieId: $movieId) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_TV_SERIES = gql`
  mutation deleteTvSeries($tvId: ID!) {
    deleteTvSeries(tvId: $tvId) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie($movieId: ID!, $movie: InputMovie){
    updateMovie(movieId: $movieId, movie: $movie){
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TO_FAVOURITES_MOVIE = gql`
  mutation AddToFavouritesMovies($movieId: ID!, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]){
    addToFavouritesMovies(movieId: $movieId, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) @client {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TO_FAVOURITES_TV_SERIES = gql`
  mutation AddToFavouritesTv($movieId: ID!, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]){
    addToFavouritesTv(movieId: $movieId, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) @client {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_FAVOURITES = gql`
    query GetFavourite{
        movieFavourites @client{
            title
            overview
            poster_path
            popularity
            tags
        }
        tvFavourites @client{
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`