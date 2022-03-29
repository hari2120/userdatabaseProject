import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios'

const RegistrationForm = () => {
  const router = useRouter()
  const submitDetails = async(event) => {
    event.preventDefault();
    console.log(event);
    const name = event.target.name.value; // accessing directly
    const email = event.target.email.value; // accessing directly
    const phone = event.target.phone.value; // accessing directly
    const work = event.target.work.value; // accessing via `form.elements`
    const password = event.target.password.value; // accessing via `form.elements`
    const cpassword = event.target.cpassword.value; // accessing via `form.elements`
    console.log(name, email, phone, work, password, cpassword);
    await axios.post('http://localhost:8000/register', 
    {name, email, phone, work, password, cpassword},  {
      "Content-Type": "application/json"
    })
    .then((data)=> {
      console.log(data);
      window.alert("sucessfull Registration")
      router.push("/login")
    })
    .catch((err)=> {
      console.log(err);
        window.alert("Invalid Registration")
    })
  }
  return (
    <div className="container">
      <h1 >Niladisify Registration Form</h1>
      <Form onSubmit={submitDetails}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name"  type="text" placeholder="Enter Your Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email"  type="email" placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone"  type="phone" placeholder="Enter Phone Number" />
          </Form.Group>

          <Form.Group as={Col} controlId="work">
            <Form.Label>Password</Form.Label>
            <Form.Control name="work"  type="text" placeholder="work" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password"  type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="cpassword"  type="password" placeholder="Confirm Password" />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
