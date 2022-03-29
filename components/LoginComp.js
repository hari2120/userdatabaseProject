import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/router'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updateUser } from './user/LoginSlice';

const LoginComp = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const submitDetails = async(event) => {
    event.preventDefault();
    const email = event.target.email.value; // accessing directly
    const password = event.target.password.value; // accessing via `form.elements`
    axios.post('/api/auth/login', {email, password})
    .then(({ data: {accessToken, details}})=> {
      console.log(details);
      dispatch(
        updateUser({
          isLoggedIn: true,
          accessToken: accessToken.token,
          userDetails: details,
        })
      );
      window.alert("Login sucessfull")
      router.push("/")

    })
    .catch((err)=> {
      console.log(err);
      window.alert("Login failed")
    })
  }
  return (
    <div className="container">
      <Form onSubmit={submitDetails}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email"  type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password"  type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default LoginComp
