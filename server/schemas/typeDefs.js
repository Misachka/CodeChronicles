const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    post: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addPost(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removePost(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;