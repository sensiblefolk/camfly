import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
// import { getMainDefinition } from 'apollo-utilities';

import getToken from './services/tokens';
import { logout } from './services/user';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_DEV_DBURL,
});

// const wsLink = new WebSocketLink({
//     uri: `${process.env.REACT_APP_DEV_WSURL}`,
//     options: {
//         reconnect: true,
//         connectionParams: async () => {
//             const token = await getToken();
//             return {
//                 headers: {
//                     Authorization: token ? `Bearer ${token}` : ''
//                 },
//             };
//         },
//     },
// });

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await getToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            'X-Hasura-Role': 'user'
        },
    };
});

// const link = split(
//     // split based on operation type
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//     },
//     wsLink,
//     authLink.concat(httpLink),
// );

const cache = new InMemoryCache()

const logoutLink = onError(({ networkError }: any) => {
    if (networkError && networkError?.statusCode === 401) {
        logout();
    };
})

const client = new ApolloClient({
    link: logoutLink.concat(authLink.concat(httpLink)),
    cache,
});

export { client, cache };