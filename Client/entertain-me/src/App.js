import React from "react";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import TvDetailPage from "./pages/TvDetailPage";
import Favourites from "./pages/Favourites";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./config/graphql";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/navbar";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path={"/"}>
              <HomePage />
            </Route>
            <Route exact path={"/add"}>
              <AddPage />
            </Route>
            <Route exact path={"/edit/:id"}>
              <EditPage />
            </Route>
            <Route exact path={"/movieDetail/:id"}>
              <MovieDetailPage />
            </Route>
            <Route exact path={"/tvDetail/:id"}>
              <TvDetailPage />
            </Route>
            <Route exact path={"/favourites"}>
              <Favourites />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
