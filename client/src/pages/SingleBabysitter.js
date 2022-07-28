import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Container, CardTitle, CardBody, CardImg, Card } from 'reactstrap';
import { saveBabysitterIds, getSavedBabysitterIds } from '../utils/localStorage';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import RatingList from '../components/RatingList';
import RatingForm from '../components/RatingForm';
import SMSForm from '../components/SMSForm';
import { SAVE_BABYSITTER } from '../utils/mutations'
import Auth from '../utils/auth';
import { QUERY_SINGLE_BABYSITTER } from '../utils/queries';

const SingleBabysitter = () => {
  const [saveBabysitter, { error }] = useMutation(SAVE_BABYSITTER);

  const [savedBabysitterIds, setSavedBabysitterIds] = useState(getSavedBabysitterIds());

  useEffect(() => {
    return () => saveBabysitterIds(savedBabysitterIds);
  });

  const { babysitterId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BABYSITTER, {
    variables: { babysitterId: babysitterId },
  });
  const babysitter = data?.babysitter || {};

  const handleSaveBabysitter = async () => {
    const babysitterId = data.babysitter._id
    console.log(babysitterId)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const datab = await saveBabysitter({
        variables: { babysitterId }
      });
console.log(datab);
      if (error) {
        throw new Error('We apologise for the inconvenience. Something went wrong.');
      }
      // if book successfully saves to user's account, save book id to state
      setSavedBabysitterIds([...savedBabysitterIds, babysitterId]);
      window.location.reload()
    } catch (err) {
      
      console.error(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    <Container>
      <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
        <CardImg top width="90%" src={babysitter.babysitterPic} alt="" className='img' style={{ width: '90%', maxWidth: '250px', textAlign: 'center' }} />
        <CardTitle tag="h3" >
          {babysitter.babysitterAuthor} <br />
        </CardTitle>
        <CardBody >
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              lineHeight: '1.5',
            }}
          >
            {babysitter.babysitterAbout}
          </blockquote>
        </CardBody>
        {Auth.loggedIn() && (
          <Button
            disabled={savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)}
            className='btn-block btn-info'
            onClick={() => handleSaveBabysitter(babysitter.babysitterId)}>
            {savedBabysitterIds?.some((savedBabysitterId) => savedBabysitterId === babysitter.babysitterId)
              ? 'This babysitter has already been saved.'
              : 'Save this babysitter'}
          </Button>
        )}
        <SMSForm 
        babysitterPh={babysitter.babysitterPh}
        babysitterAuthor={babysitter.babysitterAuthor}
         />
        <div className="my-5">
          <RatingList ratings={babysitter.ratings} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
          <RatingForm babysitterId={babysitter._id} />
        </div>
      </Card>
    </Container>
  );
};

export default SingleBabysitter;
