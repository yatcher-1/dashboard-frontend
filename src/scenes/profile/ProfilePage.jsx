import React, { Fragment, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';

const ProfilePage = () => {
    const [subfirm, setSubFirm] = useState([]);
  
    const data =  JSON.parse(localStorage.getItem('user'));
    const name = data.name;
    const email = data.email;
    const role = data.role;
    const firm = data.firm;
    const portal = data.portal;

    useEffect(()=>{
      axios.get(AppURL.UserSubFirm(firm)).then(response => {
        setSubFirm(response.data)
    }).catch(error => {
  
    });
    }, [])

   if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }

    let subfirm1 = subfirm.map((sub, i)=> {
        return sub.subparty_name;
    }) 
    
    return (
    <Fragment>
        <Container>
        <Row className='mt-5'>
          <Col lg={12} md={12} sm={12} className='d-flex justify-content-center align-items-center'>
          <ul className='list-group text-center w-50'>
        <li className='list-group-item'>Name: {name}</li>
        <li className='list-group-item'>Email: {email}</li>
        <li className='list-group-item'>Role: {role}</li>
        <li className='list-group-item'>Firm: {firm}</li>
        <li className='list-group-item'>Sub-Firm: {subfirm1.join(", ")}</li>
        <li className='list-group-item'>Portals: {portal}</li>
        </ul>
          </Col>
        </Row>
      </Container>
        </Fragment>
    )
}

  export default ProfilePage;
  