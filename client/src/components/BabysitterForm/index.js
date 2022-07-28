import React, { useState } from 'react';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BABYSITTER, UPDATE_BABYSITTER_PROFILE } from '../../utils/mutations';
import { QUERY_BABYSITTERS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ImageUpload from '../ImageUpload';
import Location from '../Location';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

const BabysitterForm = () => {
  const [formState, setFormState] = useState({
    babysitterAbout: '',
    babysitterLoc: '',
    babysitterCert: '',
    babysitterPic: '',
    babysitterPh: '',
  });

  const [addBabysitter, { error }] = useMutation(ADD_BABYSITTER, {
    update(cache, { data: { addBabysitter } }) {
      try {
        const { babysitters } = cache.readQuery({ query: QUERY_BABYSITTERS });

        cache.writeQuery({
          query: QUERY_BABYSITTERS,
          data: { babysitters: [addBabysitter, ...babysitters] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, babysitters: [...me.babysitters, addBabysitter] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBabysitter({
        variables: {
          babysitterAbout: formState.babysitterAbout,
          babysitterLoc: formState.babysitterLoc,
          babysitterCert: formState.babysitterCert,
          babysitterPic: formState.babysitterPic,
          babysitterPh: formState.babysitterPh,
          babysitterAuthor: Auth.getProfile().data.firstName,
          babysitterFirst: Auth.getProfile().data.firstName,
          babysitterLast: Auth.getProfile().data.lastName,
          babysitterEmail: Auth.getProfile().data.email,
        },
      });

      setFormState({
        babysitterAbout: '',
        babysitterLoc: '',
        babysitterCert: '',
        babysitterPic: '',
        babysitterPh: '',
      });
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState)
  return (
    <>
      {Auth.loggedIn() ? (
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <Form
                className='babysitter-form'
                onSubmit={handleFormSubmit}>
                <Row>
                  <h4 className="title">
                    My profile
                  </h4>
                  <ImageUpload avatar
                    setFormState={setFormState}
                    name="babysitterPic"
                  />
                </Row>
                <Row>
                  <Col md="6" sm="6">
                    <AvForm>
                      <label htmlFor='form-ph'>Mobile Number</label>
                      <AvField
                        name="babysitterPh"
                        placeholder="+61 XXX XXX XXX"
                        validate={{ pattern: { value: /^(\+(614))([0-9]{8})$/, errorMessage: 'You must enter an Australian mobile phone number in the following exact format +614XXXXXXXX' } }}
                        onChange={handleChange}
                      />
                    </AvForm>
                  </Col>
                  <Col md="6" sm="6">
                    <FormGroup>
                      <label htmlFor='form-location'>Post Code</label>
                      <Location
                        handleChange={handleChange}
                        formState={formState}
                        setFormState={setFormState} />
                    </FormGroup>
                  </Col>
                </Row>
                <AvForm>
                  <label htmlFor='form-cert'>Relevant Certificates/Qualifications</label>
                  <AvField
                    name="babysitterCert"
                    placeholder="WWCC, Police Check, Bachelor in Education..."
                    onChange={handleChange}
                    />
                </AvForm>
                <FormGroup>
                  <label htmlFor='form-about'>About</label>
                  <Input
                    name="babysitterAbout"
                    placeholder=""
                    className="textarea"
                    rows="3"
                    onChange={handleChange}
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="btn-wd btn-round"
                    color="info"
                    type="submit"
                  >
                    Save
                  </Button>
                  {/* <Button
                    className="btn-wd btn-round"
                    outline
                    color="info"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button> */}
                </div>
              </Form>
            </Col>
          </Row>
          {error && (
            <div className="col-12 my-3 p-3">
              {error.message}
            </div>
          )}
        </Container>
      ) : (
        <p>
          You need to be logged in to create your profile. Please{' '}
          <Link to="/login">login</Link> or <Link to="/register">register.</Link>
        </p>
      )}
    </>

  );
};
export default BabysitterForm;
