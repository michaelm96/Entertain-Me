import React from "react";
import Movie from "../components/Movies/movies";
import TvSeries from "../components/TvSeries/tvSeries";
import { GET_CONTENTS } from "../queries";

import { useQuery } from "@apollo/react-hooks";

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_CONTENTS);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: ${error.message}</p>

  return (
    <>
      {data && (
        <>
          <h1 style={{ textAlign: "center" }}>Movies</h1>
          <h3 style={{ textAlign: "center" }}>List: </h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.getContents.movies.map((movie, idx) => {
              return <Movie key={idx} movie={movie}></Movie>;
            })}
          </div>
          <br />
          <h1 style={{ textAlign: "center" }}>Tv Series</h1>
          <h3 style={{ textAlign: "center" }}>List: </h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.getContents.tvSeries.map((tv,idx) => {
              return <TvSeries key={idx} tvSeries={tv}></TvSeries>;
            })}
          </div>
        </>
      )}
    </>
  );
}
