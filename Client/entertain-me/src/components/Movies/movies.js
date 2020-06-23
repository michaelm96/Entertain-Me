import React from "react";
import { Card, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_MOVIE,
  GET_CONTENTS,
  ADD_TO_FAVOURITES_MOVIE,
} from "../../queries";
import { Link } from "react-router-dom";
import "./movies.css";

function Movies(props) {
  const { _id, title, overview, poster_path, popularity, tags } = props.movie;

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_CONTENTS }],
  });

  const [addToFavourite] = useMutation(ADD_TO_FAVOURITES_MOVIE);

  function addThisFavourite() {
    addToFavourite({
      variables: {
        movieId: _id,
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
  }

  async function deleteThisMovie(id) {
    await deleteMovie({
      variables: {
        movieId: id,
      },
    });
  }

  return (
    <>
      <Card style={{ width: "25rem", margin: "1rem auto",backgroundImage: "linear-gradient(to top right, #3a1c71, #d76d77, #ffaf7b)"}}>
        <Card.Img variant="top" src={poster_path} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Desc: "{overview}"</Card.Text>
          <Card.Text>Popularity: {popularity}</Card.Text>
          Tags:
          {!tags && <p>Tag not found</p>}
          {tags &&
            tags.map((tag, idx) => <Card.Text key={idx}>#{tag}</Card.Text>)}
          <Button
            variant="primary"
            className="btnMar"
            onClick={() => {
              addThisFavourite();
            }}
          >
            Add to Favourite
          </Button>
          <Button
            variant="danger"
            className="btnMar"
            onClick={() => {
              deleteThisMovie(_id);
            }}
          >
            Delete
          </Button>
          <Link to={`/edit/${_id}`}>
            <Button
              variant="warning"
              className="btnMar"
              style={{ color: "white", textDecoration: "none" }}
            >
              Edit
            </Button>
          </Link>
          <Link
            to={`/movieDetail/${_id}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button variant="success" className="btnMar">
              Detail
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Movies;
