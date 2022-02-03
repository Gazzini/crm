import { gql } from 'apollo-server-express';

const schema = gql`
type Query {
    version: String!
    hello: String!
    me: String
}
type Mutation {
    goodbye: String!
    register(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
}
`;

export default schema;
