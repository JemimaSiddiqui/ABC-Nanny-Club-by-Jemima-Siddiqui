import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

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

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
            <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>Need to find a nanny in Sydney? You have come to the right place!</h3>
                    <p>
                      We have thousands of babysitter and caregiver profiles on our website, plus everything you need to know. Additionally, you can also save babysitter profiles for later, or even add your own profile!
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Login</CardTitle>
                  <Form onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <Input
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                    <label htmlFor="pwd">Password</label>
                    <Input
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                    {error ? (
                      <div>
                        <p className="error-text">The provided username and/or password is incorrect.</p>
                      </div>
                    ) : null}
                    <Button block type="submit" className="btn-round" color="default">
                      Submit
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
    </>
  );
}

export default Login;
