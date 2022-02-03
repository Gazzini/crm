import { AccountService } from '../auth/AccountService';
import { Resolvers } from './generated/resolvers-types';
import { GQLContext } from './GQLContext';

export const resolvers: Resolvers<GQLContext> = {
    Query: {
        version: () => '1.0',
        hello: () => 'World!',
        me: (_, __, ctx) => AccountService.getUserId({ ctx }),
    },
    Mutation: {
        goodbye: () => 'Cruel world!',
        register: async (_, { username, email, password }, ctx) => await AccountService.registerUser({ username, email, password, ctx, }),
        login: async (_, { email, password }, ctx) => await AccountService.loginUser({ email, password, ctx, }),
    },
};
