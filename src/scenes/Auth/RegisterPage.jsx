import { Autocomplete, Box, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react'
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { Fragment } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const RegisterPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"  />;
    const checkedIcon = <CheckBoxIcon fontSize="small"  />;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("");
    const [portal, setPortal] = useState([]);
    const [selectPortal, setSelectPortal] = useState([]);
    const [firm, setFirm] = useState([]);
    const [selectFirm, setSelectFirm] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchRecords = () => {
        let portalUrl = axios.get(AppURL.UserPortal);
        let firmUrl = axios.get(AppURL.UserFirm);

        axios.all([portalUrl, firmUrl], { maxContentLength: Infinity }).then(
            axios.spread((...responses) => {
                if(responses[0].status === 200){
                    setSelectPortal(responses[0].data);
                }
                if(responses[1].status === 200){
                    setSelectFirm(responses[1].data);
                }
            })
        )
    }
    
    useEffect(()=> {
        fetchRecords();
    }, [])

    const handleChange = (event, value) => setPortal(typeof value === 'string' ? (value.join(',')).toString() : (value).toString());

    let firmSelect = selectFirm.map((firm, i)=>{
        return <option key={i.toString()} value = {firm.party_name}>{firm.party_name}</option>
    });
    
    let portalSelect = selectPortal.map((portal, i)=>{
        return portal.portal;
    });
    

    const FormSubmit = (e) => {
        e.preventDefault();
        window.scroll(0,0)
        const data = {
            name,
            email,
            password,
            password_confirmation,
            role,
            portal,
            firm
        }
        axios.post(AppURL.UserRegister,data).then(response => {
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            setLoggedIn(true);
            e.target.reset();
        }).catch(error => {
            
        }, []);
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
        <Header title="REGISTER PAGE" />
        </Box>
        <Typography display="flex" justifyContent="center" alignItems="center"
        variant="h3"
        fontWeight="bold"
        color={colors.greenAccent[500]}
        >
        Client Register Page
        </Typography>
        </Box>

    <Container> 
    <Row className='p-2'>
        <Col className='shadow-sm mt-2' md={12} lg={12} sm={12} xs={12}>
            <Row className='text-center'>
                <Col className='d-flex justify-content-center' md={12} lg={12} sm={12} xs={12}>
                    <Form onSubmit={FormSubmit} className='onboardForm'>
                        
                        <input type='name' onChange={(e)=>{setName(e.target.value)}} className='form-control m-2' placeholder='Enter your name'/>
                        
                        <input type='email' onChange={(e)=>{setEmail(e.target.value)}} className='form-control m-2' placeholder='Enter your email'/>
                        
                        <input type='password' onChange={(e)=>{setPassword(e.target.value)}} className='form-control m-2' placeholder='Enter your password'/>
                        
                        <input type='password' onChange={(e)=>{setPasswordConfirmation(e.target.value)}} className='form-control m-2' placeholder='confirm password'/>

                        <select onChange={(e)=>{setRole(e.target.value)}} className="form-control m-2">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        </select>

                        <select onChange={(e)=>{setFirm(e.target.value)}} className="form-control m-2">
                        <option value="">Select Firm</option>
                        {firmSelect}
                        </select>

                        <div className="m-2">
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={portalSelect}
                            disableCloseOnSelect
                            onChange={handleChange}
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    checked={selected}
                                />
                                {option}
                                </li>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} 
                                label="Select Portal" 
                                placeholder="Portals..."  
                                />
                            )}
                            />
                            </div>

                        <Button type="submit" className='btn btn-block site-btn-login m-2'>
                            Sign Up
                        </Button>
                        <br></br><br></br>
                        <hr />
                        <p>
                            <b>Aldready Have an Account?</b> <Link to={"/login"}>Login</Link>
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

export default RegisterPage
