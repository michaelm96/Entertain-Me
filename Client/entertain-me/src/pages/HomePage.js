import React, { useState } from "react";
import Movie from "../components/Movies/movies";
import TvSeries from "../components/TvSeries/tvSeries";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_MOVIES = gql`
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

const GET_TV_SERIES = gql`
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

const GET_CONTENTS = gql`
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

const GET_MOVIE_BY_ID = gql`
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

const ADD_MOVIE = gql`
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

export default function HomePage() {
  const [inputForm, setInputForm] = useState({
    tags: [],
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0.0,
  });
  // const { loading, error, data } = useQuery(GET_MOVIES);
  const { loading, error, data } = useQuery(GET_CONTENTS);
  //   const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
  //     variables: {
  //       movieId: "5eecb1fac0bd691ddcad2466",
  //     },
  //   });

  const [addMovie, { data: dataNewMovie }] = useMutation(ADD_MOVIE);

  function onChange(e) {
    if (e.target.name === "number" && e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.name === "number" && e.target.value > 10) {
      e.target.value = 10;
    }
    const { name, value } = e.target;

    const newInputForm = {
      ...inputForm,
      [name]: value,
    };

    console.log(newInputForm);
    setInputForm(newInputForm);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;
  return (
    <>
      <h1>Movies</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMovie({
            variables: {
              movie: inputForm,
            },
          });
        }}
      >
        <h3>Title:</h3>
        <input
          type="text"
          placeholder="insert title here"
          name="title"
          value={inputForm.title}
          onChange={onChange}
        ></input>
        <br />
        <h3>Overview:</h3>
        <input
          type="text"
          placeholder="insert overview here"
          name="overview"
          value={inputForm.overview}
          onChange={onChange}
        ></input>
        <br />
        <h3>Image:</h3>
        <input
          type="text"
          placeholder="insert poster url here"
          name="poster_path"
          value={inputForm.poster_path}
          onChange={onChange}
        ></input>
        <br />
        <h3>Popularity:</h3>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="popularity"
          value={inputForm.popularity}
          onChange={onChange}
        ></input>
        <br />
        <h3>Genre:</h3>
        <label>
          <input
            type="checkbox"
            onChange={onChange}
            name="Comedy"
            value={inputForm.tags}
          />
          Comedy
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            onChange={onChange}
            name="Comedy"
            value={inputForm.tags}
          />
          Psychological
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            onChange={onChange}
            name="Comedy"
            value={inputForm.tags}
          />
          Mystery
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            onChange={onChange}
            name="Comedy"
            value={inputForm.tags}
          />
          Romance
        </label>
        <br />
        <button type="submit">Add Movie</button>
      </form>
      <div>
        <h3>List: </h3>
        {data.getContents.movies.map((movie) => {
          return <Movie key={movie.id} movie={movie}></Movie>;
        })}
        {/* <Movie movie={data.getMovieById}></Movie> */}
      </div>
      <h1>TvSeries</h1>
      <div>
        <h3>List: </h3>
        {data.getContents.tvSeries.map((tv) => {
          return <TvSeries key={tv.id} tvSeries={tv}></TvSeries>;
        })}
      </div>
    </>
  );
}
