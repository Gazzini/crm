import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './schema';
import { resolvers } from './resolvers';
import { Express } from "express";
import { GQLContext } from './GQLContext';


/// This is slightly harder than it should be because ApolloServer loads async, and
/// we have to initialize it before calling applyMiddleware(...)
export const applyGraphqlToExpressApp = async (app: Express) => {
    
    const server = new ApolloServer<GQLContext>({
        typeDefs: schema,
        resolvers,
        context: ({ req, res }) => {
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

    console.log('gql is starting...');
    await server.start();

    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: false,
    });

    console.log('gql is ready!');
}
