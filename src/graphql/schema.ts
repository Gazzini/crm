import { gql } from 'apollo-server-express';

const schema = gql`
type Query {
    version: String!
    hello: String!
}
type Mutation {
    goodbye: String!
}
`;

export default schema;
