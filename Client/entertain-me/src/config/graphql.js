import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GET_FAVOURITES } from "../queries";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/",
  resolvers: {
    Mutation: {
      addToFavouritesMovies(_, args, context) {
        console.log(args);

        let newFavorites = {
          movieId: args.movieId,
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags,
          __typename: "movieFavourites",
        };

        let { movieFavourites } = context.cache.readQuery({
          query: GET_FAVOURITES,
        });

        // console.log(movieFavourites);
        // let check = false;
        // movieFavourites.map((mov) => {
        //     console.log(mov);
        //     console.log(args.movieId);
        //   if (mov.movieId === args.movieId) {
        //     check = true;
        //   }
        // });

        // if (!check) {
          context.cache.writeData({
            data: {
              movieFavourites: movieFavourites.concat(newFavorites),
            },
          });
        // }
      },

      addToFavouritesTv(_, args, context) {
        console.log(args);

        let newFavorites = {
          movieId: args.movieId,
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags,
          __typename: "movieFavourites",
        };

        let { tvFavourites } = context.cache.readQuery({
          query: GET_FAVOURITES,
        });

        context.cache.writeData({
          data: {
            tvFavourites: tvFavourites.concat(newFavorites),
          },
        });
      },
    },
  },
});

cache.writeData({
  data: {
    movieFavourites: [],
    tvFavourites: [],
  },
});

export default client;
