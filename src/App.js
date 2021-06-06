import React, { Component } from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import store, { history } from "./store";
import { ConnectedRouter } from "connected-react-router";

import { push } from "connected-react-router";

import PDP from "./domain/components/PDP";
import Categories from "./domain/components/Categories";
import Cart from "./domain/components/Cart";
import {
  ApolloClient,
  inMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphqel error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Categories} />
                <Route exact path="/plp/:name" component={Categories} />
                <Route exact path="/pdp/:id" component={PDP} />
                <Route exact path="/cart" component={Cart} />
              </Switch>
            </ConnectedRouter>
          </>
        </Provider>
      </ApolloProvider>
    );
  }
}




export default App;
