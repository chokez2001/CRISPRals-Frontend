import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { HOST_API_KEY } from '../config-global'
const client = new ApolloClient({
    uri: `${HOST_API_KEY}/graphql`,
    cache: new InMemoryCache(),
})

const ApolloClientConfig = ({ children }: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default ApolloClientConfig
