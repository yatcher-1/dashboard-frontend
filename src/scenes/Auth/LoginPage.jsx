import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link, Navigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const FormSubmit = (e) => {
      e.preventDefault();
      window.scroll(0,0)
      const data = {
          email,
          password,
      }
      axios.post(AppURL.UserLogin,data).then(response => {
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setLoggedIn(true);
          e.target.reset();
      }).catch(error => {
          
      });
  }
  
  if(loggedIn){
      return <Navigate to={"/"} />
   }else{

   }

  if(localStorage.getItem('token')){
      return <Navigate to="/" />
  }

  return (
      <Fragment>
      <Box mt="20px">
      <Box display="flex" justifyContent="center" alignItems="center">
      <Header title="LOGIN PAGE" />
      </Box>
      <Typography display="flex" justifyContent="center" alignItems="center"
      variant="h3"
      fontWeight="bold"
      color={colors.greenAccent[500]}
      >
      CLient Login Page
      </Typography>
      </Box>

  <Container> 
  <Row className='p-2'>
      <Col className='shadow-sm mt-2' md={12} lg={12} sm={12} xs={12}>
          <Row className='text-center'>
              <Col className='d-flex justify-content-center' md={12} lg={12} sm={12} xs={12}>
                  <Form onSubmit={FormSubmit} className='onboardForm'>
                      <input type='email' onChange={(e)=>{setEmail(e.target.value)}} className='form-control m-2' placeholder='Enter your email'/>
                      
                      <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className='form-control m-2' placeholder='Enter your password'/>
                      
                      <Button type="submit" className='btn btn-block site-btn-login m-2'>
                          Login
                      </Button>
                      <br></br><br></br>
                      <hr />
                      <p>
                          <b>Dont Have an Account?</b><Link to={"/register"}>Register</Link>
                      </p>
                  </Form>
              </Col>

              <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={6} xs={6}>
                  <img className='onboardbanner' src={""} alt=''/>
              </Col>
          </Row>
      </Col>
  </Row>
</Container>
</Fragment>
  )
}

export default LoginPage
