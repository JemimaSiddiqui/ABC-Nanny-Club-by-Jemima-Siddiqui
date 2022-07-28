import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/client';

import BabysitterList from '../components/BabysitterList';


import { QUERY_BABYSITTERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_BABYSITTERS);
  const babysitters = data?.babysitters || [];

  return (
    <Container>
      <Row>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
              <Col className="ml-auto" >
                <Row>
                    <h3>Need to find a nanny in Sydney? You have come to the right place!</h3>
                    <p>
                      We have thousands of babysitter and caregiver profiles on our website, plus everything you need to know. Additionally, you can also save babysitter profiles for later, or even add your own profile!
                    </p>
                </Row>          
              </Col>
              <BabysitterList
                babysitters={babysitters}
                title="Find a babysitter is your area"
              />
              </>
            )}
          </div>
      </Row>
    </Container>
  );
};

export default Home;
