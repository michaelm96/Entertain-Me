import React, { useState, useEffect } from "react";
import { GET_TV_BY_ID } from "../queries";
import { Container, Row, Col, Image} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0.0);
  const [tags, setTags] = useState([]);
  const { loading, error, data } = useQuery(GET_TV_BY_ID, {
    variables: {
      tvId: id,
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.getTvById.title);
      setOverview(data.getTvById.overview);
      setPoster_path(data.getTvById.poster_path);
      setPopularity(data.getTvById.popularity);
      setTags(data.getTvById.tags);
    }
  }, [data]);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: ${error.message}</p>

  return (
    <Container style={{ margin: "3rem" }}>
      <Row>
        <Col xs={6} md={4}>
          <Image src={poster_path} fluid />
        </Col>
        <Col>
          <h4>
            Title: <p style={{ color: "#159957" }}>{title}</p>
          </h4>
          <h4>
            Overview: <p style={{ color: "#159957" }}>{overview}</p>
          </h4>
          <h4>
            Popularity: <p style={{ color: "#159957" }}>{popularity}</p>
          </h4>
          <h4>
            Tags:
            {tags.map((tag) => {
              return <p style={{ color: "#159957" }}>#{tag}</p>;
            })}
          </h4>
        </Col>
      </Row>
    </Container>
  );
}
