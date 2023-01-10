import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Client from './graphql/Client';
import Navigator from './navigations';

const App = () => {


  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ApolloProvider client={Client}>
        <Navigator />
      </ApolloProvider>
    </SafeAreaView>
  );
};

export default App;
