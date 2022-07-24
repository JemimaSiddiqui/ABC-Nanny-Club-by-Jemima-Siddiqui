const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const babysitterSchema = new Schema({
    babysitterFirst: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterLast: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterEmail: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterAbout: {
      type: String,
      required: 'You need to write something about yourself',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    babysitterLoc: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterCert: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterPic: {
      type: String,
      trim: true,
    },
    babysitterPh: {
      type: String,
      required: true,
      trim: true,
    },
    babysitterAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    ratings: [
      {
        ratingText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        ratingAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  });

const Babysitter = model('Babysitter', babysitterSchema);

module.exports = Babysitter;