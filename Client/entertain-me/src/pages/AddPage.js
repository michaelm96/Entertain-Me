import React, { useState } from "react";
import { ADD_MOVIE, ADD_TV_SERIES, GET_CONTENTS } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function AddPage() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0.0);
  const [tags, setTags] = useState([]);
  const [tipe, setTipe] = useState("Movie");
  const [notif, setNotif] = useState("");
  let history = useHistory();

  const [addMovie, { data: addNewMovie }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_CONTENTS }],
  });
  const [addTvSeries, { data: addNewTvSeries }] = useMutation(ADD_TV_SERIES, {
    refetchQueries: [{ query: GET_CONTENTS }],
  });

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
    if (title && overview && poster_path && popularity && tags) {
      if (tipe === "Movie") {
        addMovie({
          variables: {
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
      } else if (tipe === "Tv Series") {
        addTvSeries({
          variables: {
            tv: {
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
    } else {
      setNotif("Something is missing");
    }
  }

  return (
    <div
      className="container"
      style={{
        border: "solid black 2px",
        margin: "3rem auto 0 auto",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Add Form</h1>
      <br/>
      {notif && <Alert variant="danger" style={{ textAlign: "center" }}>{notif}</Alert>}
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
          <Form.Check
            onClick={() => onTags("Comedy")}
            name="tags"
            label="Comedy"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Psychological")}
            name="tags"
            label="Psychological"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Mystery")}
            name="tags"
            label="Mystery"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Romance")}
            name="tags"
            label="Romance"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Kids")}
            name="tags"
            label="Kids"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Documentary")}
            name="tags"
            label="Documentary"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("History")}
            name="tags"
            label="History"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Biography")}
            name="tags"
            label="Biography"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Slasher")}
            name="tags"
            label="Slasher"
            type="checkbox"
          />
          <Form.Check
            onClick={() => onTags("Sci-fi")}
            name="tags"
            label="Sci-fi"
            type="checkbox"
          />
          <br />
        </div>
        <Form.Group controlId="typeInput">
          <h4 style={{ textAlign: "center" }}>Choose the type: </h4>
          <Form.Control
            as="select"
            onClick={(e) => {
              setTipe(e.target.value);
              console.log(tipe);
            }}
          >
            <option value="Movie">Movie</option>
            <option value="Tv Series">Tv Series</option>
          </Form.Control>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" style={{ margin: "0 auto" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
