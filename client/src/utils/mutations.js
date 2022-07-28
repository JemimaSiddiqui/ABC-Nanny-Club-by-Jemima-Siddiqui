import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_BABYSITTER = gql`
  mutation addBabysitter(
    $babysitterAbout: String!
    $babysitterLoc: String
    $babysitterCert: String
    $babysitterPic: String
    $babysitterPh: String
    ) {
    addBabysitter(babysitterAbout: $babysitterAbout, babysitterLoc: $babysitterLoc, babysitterCert: $babysitterCert, babysitterPic: $babysitterPic, babysitterPh: $babysitterPh) {
      _id
      babysitterAbout
      babysitterLoc
      babysitterCert
      babysitterPic
      babysitterPh
      babysitterAuthor
      createdAt
      ratings {
        _id
        ratingText
      }
    }
  }
`;

export const UPDATE_BABYSITTER_PROFILE = gql`
	mutation updateBabysitter(
    $babysitterId: ID!
    $babysitterAbout: String!
    $babysitterLoc: String
    $babysitterCert: String
    $babysitterPic: String
    $babysitterPh: String
  ) {
		updateBabysitter(babysitterId: $babysitterId, babysitterAbout: $babysitterAbout, babysitterLoc: $babysitterLoc, babysitterCert: $babysitterCert, babysitterPic: $babysitterPic, babysitterPh: $babysitterPh) {
      _id
      babysitterAbout
      babysitterLoc
      babysitterCert
      babysitterPic
      babysitterPh
      babysitterAuthor
    }
	}
`;

export const ADD_RATING = gql`
  mutation addRating($babysitterId: ID!, $ratingText: String!) {
    addRating(babysitterId: $babysitterId, ratingText: $ratingText) {
      _id
      babysitterAbout
      babysitterLoc
      babysitterCert
      babysitterPic
      babysitterPh
      babysitterAuthor
      createdAt
      ratings {
        _id
        ratingText
        createdAt
      }
    }
  }
`;

export const SAVE_BABYSITTER = gql`
  mutation saveBabysitter($babysitterId: ID!) {
    saveBabysitter(babysitterId: $babysitterId) {
      _id
      email
      savedBabysitters {
        _id
        babysitterAbout
        babysitterLoc
        babysitterCert
        babysitterPic
        babysitterPh
        babysitterAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_SAVED_BABYSITTER = gql`
  mutation removeSavedBabysitter($babysitterId: String!) {
    removeSavedBabysitter(babysitterId: $babysitterId) {
        _id
        email
        savedBabysitters {
          _id
          babysitterAbout
          babysitterLoc
          babysitterCert
          babysitterPic
          babysitterPh
          babysitterAuthor
          createdAt
        }
    }
  }
`;
