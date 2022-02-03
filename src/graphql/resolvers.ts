import { MutationResolvers, QueryResolvers } from './generated/resolvers-types';


/// for some reason, the auto-generated "Resolvers" wants me to define some value
/// for each "type" in my schema... so, I did this instead:
type IResolver = {
    Query: QueryResolvers,
    Mutation: MutationResolvers,
};

export const resolvers: IResolver = {
    Query: {
        version: () => '1.0',
        hello: () => 'World!',
    },
    Mutation: {
        goodbye: () => 'Cruel world!',
    },
};
