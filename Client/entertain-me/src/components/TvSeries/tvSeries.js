import React from "react";
import { Card, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { ADD_TO_FAVOURITES_TV_SERIES } from "../../queries";
import "../Movies/movies.css";

function TvSeries(props) {
  const {
    _id,
    title,
    overview,
    poster_path,
    popularity,
    tags,
  } = props.tvSeries;

  const[ addToFavouriteTv ] = useMutation(ADD_TO_FAVOURITES_TV_SERIES)

  function addThisFavourite(){
    addToFavouriteTv({
      variables: {
        tvId: _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
      }
    })
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
          {tags.map((tag, idx) => (
            <Card.Text key={idx}>#{tag}</Card.Text>
          ))}
          <Button
            variant="primary"
            className="btnMar"
            onClick={() => {
              addThisFavourite();
            }}
          >
            Add to Favourite
          </Button>
          <Link to={`/tvDetail/${_id}`}>
            <Button
              variant="success"
              className="btnMar"
              style={{ color: "white", textDecoration: "none" }}
            >
              Detail
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default TvSeries;
