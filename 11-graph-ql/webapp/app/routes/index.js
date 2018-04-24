import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';

import App from './app.container';
import { Home } from './home';
import { NotFound } from './notFound';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={DEFAULT_LOCALE} />} />


        <Route exact path="/404" component={NotFound} />

        <Route path="/:lang">
          <ApolloProvider client={client}>
            <App>
              <Switch>
                <Route exact path="/:lang" component={Home} />

                <Route component={NotFound} />
              </Switch>
            </App>
          </ApolloProvider>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
