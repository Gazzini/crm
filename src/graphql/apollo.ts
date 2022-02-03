import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => {
        return { req, res };
    },
    playground: {
        settings: {
            'editor.theme': 'dark',
            'request.credentials': 'include'
        }
    },
    introspection: true,
    debug: true
});

export const graphqlHandler = server.getMiddleware({
    path: '/graphql',
    cors: false
});
