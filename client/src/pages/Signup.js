import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { AvForm, AvField } from 'availity-reactstrap-validation';

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <>
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
              <Card className="card-register">
                <CardTitle tag="h3">Sign Up</CardTitle>
                <Form onSubmit={handleFormSubmit}>
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    placeholder=""
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange}
                  />
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                      placeholder=""
                      name="lastName"
                      type="lastName"
                      id="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <AvForm>
                    <label htmlFor="email">Email</label>
                    <AvField
                      placeholder=""
                      name="email"
                      type="email"
                      id="email"
                      validate={{
                        required: {value: true, errorMessage: 'Please enter an email address'},
                        email: {value: true, errorMessage: 'Please enter a valid email address'}
                    }}
                      onChange={handleChange}
                    />
                  </AvForm>
                  <div>
                    <label htmlFor="pwd">Password</label>
                    <Input
                      placeholder=""
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-row flex-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default Signup;
