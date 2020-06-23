import React from "react";
import { Card, Button } from "react-bootstrap";
import "../Movies/movies.css";

function FavouritesCards(props) {
  const {
    _id,
    title,
    overview,
    poster_path,
    popularity,
    tags,
  } = props.data;

  return (
    <>
      <Card style={{ width: "25rem", margin: "1rem auto", backgroundImage: "linear-gradient(to top right, #3a1c71, #d76d77, #ffaf7b)"}}>
        <Card.Img variant="top" src={poster_path} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Desc: "{overview}"</Card.Text>
          <Card.Text>Popularity: {popularity}</Card.Text>
          Tags:
          {tags.map((tag, idx) => (
            <Card.Text key={idx}>#{tag}</Card.Text>
          ))}
          {/* <Button variant="danger" className="btnMar" onClick={() => }>
            Un-Favourite
          </Button> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default FavouritesCards;
