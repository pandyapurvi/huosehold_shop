import React from 'react';
import { Button, Form, Message, Segment, Icon } from "semantic-ui-react";
import Link from "next/link";
import axios from 'axios';
import catchErrors from "../utils/catchErrors";

function Login() {
  const InitialState = {
    email: '',
    password:''
  }
  const [user, setUser] = React.useState(InitialState);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({...prevState, [name]: value}))
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true)
      setError('')
      //make request to signuo
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }
  return <>
    <Message
      attached
      icon="privacy"
      header="Welcome Back!"
      content="Log in with email and password"
      color="blue"
    />
    <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
      <Message
        error
        header="Oops!!!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          Label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          Label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      New User? {" "}
      <Link href="/signup">
        <a>Signup here</a>
      </Link> {" "}
      instead.
    </Message>
  </>;
}

export default Login;

