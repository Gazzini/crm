import { PeopleRepo } from '../repo/PeopleRepo';
import { Accounts } from '../handler/Accounts';
import { Resolvers } from './generated/resolvers-types';
import { GQLContext } from './GQLContext';

/// These map queries & mutations to handler functions.
export const resolvers: Resolvers<GQLContext> = {
    Query: {
        version: () => '1.0',
        hello: () => 'World!',
        me: (_, __, ctx) => Accounts.getUserId({ ctx }),
        peopleIds: async () => await PeopleRepo.getAll(),
    },
    Mutation: {
        goodbye: () => 'Cruel world!',
        register: async (_, { username, email, password }, ctx) => await Accounts.registerUser({ username, email, password, ctx, }),
        login: async (_, { email, password }, ctx) => await Accounts.loginUser({ email, password, ctx, }),
    },
};
