import React from "react";
import HomePage from "./pages/HomePage";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./config/graphql";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <HomePage />
      </div>
    </ApolloProvider>
  );
}

export default App;
