import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const ProfilePage = () => {
    // const user = props.user;

    const data =  JSON.parse(localStorage.getItem('user'));
    const name = data.name;
    const email = data.email;

   if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }

    return (
    <Fragment>
        <Container>
        <Row className='mt-5'>
          <Col lg={12} md={12} sm={12} className='d-flex justify-content-center align-items-center'>
          <ul className='list-group text-center w-50'>
        <li className='list-group-item'>Name: {name}</li>
        <li className='list-group-item'>Email: {email}</li>
        </ul>
          </Col>
        </Row>
      </Container>
        </Fragment>
    )
}

  export default ProfilePage;
  