import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => {
        // TODO: auth here?
        return { req, res };
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              'editor.theme': 'dark',
              'editor.cursorShape': 'line',
              'editor.reuseHeaders': true,
              'tracing.hideTracingResponse': true,
              'queryPlan.hideQueryPlanResponse': true,
              'editor.fontSize': 16,
              'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
              'request.credentials': 'include',
            },
        }),
    ],
    introspection: true,
    debug: true
});

export const graphqlHandler = server.getMiddleware({
    path: '/graphql',
    cors: false
});
