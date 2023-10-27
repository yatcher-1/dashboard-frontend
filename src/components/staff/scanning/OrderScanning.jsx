import React, { Fragment, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box, LinearProgress, TextField, Typography } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AppURL from '../../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderScanning = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data =  JSON.parse(localStorage.getItem('user'));
    const firm = data.firm;
    const [scanData, setScanData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        GetData();
    }, [])

    const GetData = () => {
      axios.get(AppURL.UserAllScanScanned(firm))
        .then(response => {
          setScanData(response.data);
          setLoading(false);
        })
        .catch(error => {
          toast.error(error.response.data.message, {
            position: "top-right"
        });
        });
    }


    if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }

    const handleChange = async (e) => {
      let awb = e.target.value;
      let data = {
        firm,
        awb,
      }
      await axios.post(AppURL.UserScanning,data)
      .then(response => {
        e.target.value="";
        let dataPost = response.data;
        setScanData(dataPost.scan);
      })
      .catch(error => {
        
      });
    }


    const columns = [
        {
          field: "Portal",
          headerName: "Portal",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Courier",
          headerName: "Courier",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Date",
          headerName: "Date",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Firm",
          headerName: "Firm",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Order_ID",
          headerName: "Order Id",
          flex: 2,
          cellClassName: "name-column--cell",
        },
        {
          field: "AWB",
          headerName: "AWB",
          flex: 2,
          cellClassName: "name-column--cell",
        },
        {
          field: "Portal_SKU",
          headerName: "SKU",
          flex: 3,
          cellClassName: "name-column--cell",
        },
        {
          field: "Qty",
          headerName: "Qty",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Action",
          headerName: "Status",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "updated_at",
          headerName: "Updated-At",
          flex: 2,
          cellClassName: "name-column--cell",
          hideable: true,
        },
      ];
    
    return (
    <Fragment>
        <Container>
          <Row>

          <Col lg={12}>
              <Container className='d-flex justify-content-center'>
              <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ p: "15px 10px 5px 20px" }}
            >
              Scan Order
            </Typography>
            <TextField onChange={handleChange} id="outlined-basic" label="Scan Here..." variant="outlined" autoFocus/>
            </Container>
          </Col>

          <Col lg={12}>
          <Box
        p="48px 32px"
        height="100vh"
        width="80vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          slots={{ Toolbar: GridToolbar }}
          loading={loading}
          rows={scanData}
          columns={columns}
          components={{ Toolbar: GridToolbar  }}
          {...scanData}
          initialState={{
          sorting: {
            sortModel: [{ field: 'updated_at', sort: 'desc' }],
            },
          }}
          columnVisibilityModel={{
            updated_at: false,
          }}
        />
      </Box>
      </Col>
      </Row>
      </Container>
      <ToastContainer />
      </Fragment>
    )
}

export default OrderScanning
