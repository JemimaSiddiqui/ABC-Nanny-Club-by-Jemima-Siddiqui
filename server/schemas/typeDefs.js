const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  babysitters: [Babysitter]!
  savedBabysitters: [Babysitter]!
}

type Babysitter {
  _id: ID
  babysitterAbout: String
  babysitterEmail: String
  babysitterLoc: String
  babysitterCert: String
  babysitterPic: String
  babysitterPh: String
  babysitterAuthor: String
  babysitterFirst: String
  babysitterLast: String
  createdAt: String
  ratings: [Rating]!
}

type Rating {
  _id: ID
  ratingText: String
  ratingAuthor: String
  createdAt: String
}

type Auth {
  token: ID!
  user: User
}

input babysitterInput {
  _id: ID
  babysitterAbout: String
  babysitterEmail: String
  babysitterLoc: String
  babysitterCert: String
  babysitterPic: String
  babysitterPh: String
  babysitterAuthor: String
  babysitterFirst: String
  babysitterLast: String
  createdAt: String
}

type Query {
  users: [User]
  user(email: String!): User
  babysitters(email: String): [Babysitter]
  babysitter(babysitterId: ID!): Babysitter
  me: User
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addBabysitter(babysitterAbout: String!, babysitterLoc: String, babysitterCert: String, babysitterPic: String, babysitterPh: String): Babysitter
  updateBabysitter(babysitterId: ID!, babysitterAbout: String!, babysitterLoc: String, babysitterCert: String, babysitterPic: String, babysitterPh: String): Babysitter
  addRating(babysitterId: ID!, ratingText: String!): Babysitter
  removeBabysitter(babysitterId: ID!): Babysitter
  removeRating(babysitterId: ID!, ratingId: ID!): Babysitter
  saveBabysitter(babysitterId: ID!): User
  removeSavedBabysitter(babysitterId: String!): User
}
`;

module.exports = typeDefs;
