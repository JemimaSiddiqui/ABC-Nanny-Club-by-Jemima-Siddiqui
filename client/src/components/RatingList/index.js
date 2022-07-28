import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const RatingList = ({ ratings = [] }) => {
  if (!ratings.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Reviews
      </h3>
      <div className="flex-row my-4">
        {ratings &&
          ratings.map((rating) => (
            <div key={rating._id} className="col-12 mb-3 pb-3">
              <Card className="card">
                <CardHeader className="card-header">
                  {rating.ratingAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {rating.createdAt}
                  </span>
                </CardHeader>
                <CardBody className="card-body">{rating.ratingText}</CardBody>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};

export default RatingList;
