import React from 'react';
import { Button, Form, Message, Segment, Icon } from "semantic-ui-react";
import Link from "next/link";
import axios from 'axios';
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

function Signup() {
  const InitialState = {
    name: '',
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true)
      setError('')
      //make request to signup
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }
  return <>
    <Message
      attached
      icon="settings"
      header="Get Started"
      content="Create a new account"
      color="teal"
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
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
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
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="signup"
          type="submit"
          color="orange"
          content="SignUp"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      Existing User? {" "}
      <Link href="/login">
        <a>Log in here</a>
      </Link> {" "}
      instead.
    </Message>
  </>;
}

export default Signup;
