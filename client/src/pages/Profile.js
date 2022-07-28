import React from 'react';
import { Row } from 'reactstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import BabysitterForm from '../components/BabysitterForm';
import BabysitterList from '../components/BabysitterList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { email: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Redirect to="/me" />;
  }
  console.log(user.babysitters)
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    return (
      <h4>
        Please login to view this page. If you don't have an account yet, please signup. 
      </h4>
    );
  }

  return (
    <div>
      <Row>
        </Row>
        <Row>
          <BabysitterList
            babysitters={user.babysitters}
            title={`${user.email}'s profile`}
            showTitle={false}
            showUsername={false}
          />
        {!userParam && (
            <BabysitterForm 
            babysitters={user.babysitters}
            />
        )}
        </Row>
    </div>
  );
};

export default Profile;
