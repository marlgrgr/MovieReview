import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      const { message, locations, path, extensions } = error;
      console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
      
      if (extensions) {
        const { httpCode, code, classification } = extensions;
        console.error(`Error details: Code: ${code}, HTTP: ${httpCode}, Classification: ${classification}`);
        
        switch (httpCode) {
          case 401:
            console.warn('Authentication required');
            localStorage.removeItem('jwt');
            window.location.replace('/session-expired');
            break;
          default:
            console.error(`Unhandled error: ${message}, code: ${code}, http code: ${httpCode}`);
        }
      }
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    if (networkError.statusCode === 401) {
      localStorage.removeItem('jwt');
      window.location.replace('/session-expired');
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});

export default client;