import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_FAVOURITES } from "../queries";
import FavouritesCards from "../components/Favourites/favouritesCards";

export default function Favourites() {
  const { loading, error, data } = useQuery(GET_FAVOURITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Movies Favourites</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data &&
          data.movieFavourites.map((movie, idx) => (
            <FavouritesCards key={idx} data={movie}></FavouritesCards>
          ))}
      </div>
      <h1 style={{ textAlign: "center" }}>Tv Series Favourites</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.tvFavourites &&
          data.tvFavourites.map((tv, idx) => (
            <FavouritesCards key={idx} data={tv}></FavouritesCards>
          ))}
      </div>
    </>
  );
}
