import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "apollo-link-error";
import { createUploadLink } from 'apollo-upload-client';

export const BASE_URL = 'https://apidev4.sapien.systems/'
export const BASE_GRAPH_QL_URL = BASE_URL + 'graphql/'
export const BASE_MEDIA_URL = BASE_URL + 'media'

const authLink = setContext(async (_, { headers }) => {
  // const token = await retrieveItem(KEY_ACCESS_TOKEN)
  // console.log(token);
  return {
    headers: {}
  }
});

const errorLink = onError(({ graphQLErrors, networkError, response, operation, forward }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions, locations, path, originalError, name, positions, source, stack, nodes }) => {
      console.log(`
        [GraphQL error]: Message: ${message}, 
        Location: ${JSON.stringify(locations)}, 
        Extenshion: ${JSON.stringify(extensions)}, 
        Path: ${path}
      `)
      // if (message === "Signature has expired") {
      //   clearData()
      //   clearStack(KEY_AUTH, {})
      // }
      console.log(graphQLErrors);
    }
    );
  if (networkError) {
    console.log(networkError);
    // getErrorMessage(networkError.message)
  }
});

const link = from([
  errorLink,
  new createUploadLink({ uri: BASE_GRAPH_QL_URL, })
])

const options = {
  typePolicies: {
    Query: {
      fields: {},
    },
  },
}

const Client = new ApolloClient({
  cache: new InMemoryCache(options),
  link: authLink.concat(link)
});

export default Client