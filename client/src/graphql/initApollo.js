import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "/graphql",
  credentials: "include"
});

export default App => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
