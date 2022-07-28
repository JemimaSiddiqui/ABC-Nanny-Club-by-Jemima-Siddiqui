import React, { useState } from 'react';
import {Form, Input, Button} from 'reactstrap'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_RATING } from '../../utils/mutations';
import Auth from '../../utils/auth';

const RatingForm = ({ babysitterId }) => {
  const [ratingText, setRatingText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addRating, { error }] = useMutation(ADD_RATING);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRating({
        variables: {
          babysitterId,
          ratingText,
          ratingAuthor: Auth.getProfile().data.email,
        },
      });

      setRatingText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ratingText' && value.length <= 280) {
      setRatingText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Add your review for this babysitter!</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <Form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >

              <Input
                name="ratingText"
                placeholder="Insert comment."
                
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></Input>
              <Button className="btn" type="submit">
                Submit Review
              </Button>
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to add a review. Please{' '}
          <Link to="/login">login</Link> or <Link to="/register">register.</Link>
        </p>
      )}
    </div>
  );
};

export default RatingForm;
