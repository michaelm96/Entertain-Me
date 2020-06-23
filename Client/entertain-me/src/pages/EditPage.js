import React, { useState, useEffect } from "react";
import { GET_CONTENTS, GET_MOVIE_BY_ID, UPDATE_MOVIE } from "../queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

export default function EditPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: id,
    },
  });
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0.0);
  const [tags, setTags] = useState([]);
  const tagsType = [
    "Comedy",
    "Psychological",
    "Mystery",
    "Romance",
    "Kids",
    "Documentary",
    "History",
    "Biography",
    "Slasher",
    "Sci-fi",
  ];
  let history = useHistory();

  useEffect(() => {
    if (data) {
      setTitle(data.getMovieById.title);
      setOverview(data.getMovieById.overview);
      setPoster_path(data.getMovieById.poster_path);
      setPopularity(data.getMovieById.popularity);
    }
  }, [data]);

  const [updateMovie, { data: updateCurrentMovie }] = useMutation(
    UPDATE_MOVIE,
    {
      refetchQueries: [{ query: GET_CONTENTS }],
    }
  );

  function onChange(e) {
    let { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "overview") {
      setOverview(value);
    } else if (name === "poster_path") {
      setPoster_path(value);
    } else if (name === "popularity") {
      if (value <= 0) {
        value = 0;
      } else if (value > 10) {
        value = 10;
      }
      setPopularity(Number(value).toFixed(1));
    }
  }

  function onTags(value) {
    let check = false;
    let idx = 0;
    for (let i = 0; i <= tags.length; i++) {
      if (tags[i] === value) {
        check = true;
        idx = i;
      }
    }
    if (check) {
      tags.splice(idx, 1);
    } else {
      tags.push(value);
    }
    setTags(tags);
  }

  async function sending() {
    updateMovie({
      variables: {
        movieId: id,
        movie: {
          title,
          overview,
          poster_path,
          popularity: Number(popularity),
          tags,
        },
      },
    });
    await history.push("/");
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;

  return (
    <div
      className="container"
      style={{
        border: "solid black 2px",
        margin: "3rem auto 0 auto",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Edit Form</h1>
      <br />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          sending();
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Group controlId="textForm">
          <h4 style={{ textAlign: "center" }}>Title</h4>
          <Form.Control
            type="text"
            placeholder="ABCDEF"
            name="title"
            value={title}
            onChange={onChange}
          />
          <h4 style={{ textAlign: "center" }}>Overview</h4>
          <Form.Control
            type="text"
            placeholder="about ABCDEF"
            name="overview"
            value={overview}
            onChange={onChange}
          />
          <h4 style={{ textAlign: "center" }}>Image Path</h4>
          <Form.Control
            type="text"
            placeholder="http://localhost:1234/ABCDEF.jpg"
            name="poster_path"
            value={poster_path}
            onChange={onChange}
          />
        </Form.Group>
        <h4 style={{ textAlign: "center" }}>Rating:</h4>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="popularity"
          style={{ margin: "0 auto" }}
          value={popularity}
          onChange={onChange}
        ></input>
        <br />
        <div style={{ margin: "0 auto" }}>
          <h4 style={{ textAlign: "center" }}>Tags:</h4>
          {tagsType.map((tagType, idx) => {
            return (
              <Form.Check
                key={idx}
                onChange={() => onTags(tagType)}
                name="tags"
                label={tagType}
                type="checkbox"
              />
            );
          })}
          <br />
        </div>
        <br />
        <Button variant="primary" type="submit" style={{ margin: "0 auto" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
