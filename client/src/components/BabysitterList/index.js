import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, CardDeck, Card, CardHeader, CardBody, CardText, CardImg, CardFooter } from 'reactstrap';
import './babysitter.css';

const BabysitterList = ({
  babysitters,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!babysitters.length) {
  }

  return (
    <Container>
      {showTitle && <h3>{title}</h3>}
      <Row xs="1" sm="1" md="2" lg="3">
            {babysitters &&
              babysitters.map((babysitter) => (
                <div key={babysitter._id}>
                  <Col>
                  <Card className="card">
                  <CardHeader className="card-header p-2 m-0">
                    {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/babysitters/${babysitter._id}`}
                      >
                        {babysitter.babysitterAuthor} <br />
                      </Link>
                    ) : (
                      <>
                        <span style={{ fontSize: '1rem' }}>
                          You added yourself on {babysitter.createdAt}
                        </span>
                      </>
                    )}
                  </CardHeader>
                  <CardBody className="card-body p-2">
                    <CardImg src={babysitter.babysitterPic} className="img" />
                    <CardText> {babysitter.babysitterAbout}</CardText>
                  </CardBody>
                  <CardFooter>
                    
                    <Link
                      className="btn"
                      to={`/babysitters/${babysitter._id}`}
                    >
                      Find out more
                    </Link>
                  </CardFooter>
                  </Card>
                  </Col>
                </div>
              ))}
      </Row>
    </Container>
  );
};

export default BabysitterList;
