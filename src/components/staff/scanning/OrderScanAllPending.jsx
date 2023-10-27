import React, { Fragment, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AppURL from '../../../api/AppURL';
import StatBox from '../../StatBox';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

const OrderScanAllPending = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data =  JSON.parse(localStorage.getItem('user'));
    const firm = data.firm;
    const [scanData, setScanData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(AppURL.UserAllScanPending(firm))
        .then(response => {
          setScanData(response.data);
          setLoading(false);
        })
        .catch(error => {
  
        });
    }, [])

    if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
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
      ];
    
    return (
    <Fragment>
        <Container>
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
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
        <DataGrid
         slots={{ Toolbar: GridToolbar }}
          loading={loading}
          rows={scanData}
          columns={columns}
          components={{ Toolbar: GridToolbar  }}
          {...scanData}
        />
      </Box>
      </Container>
    </Fragment>
    )
}

export default OrderScanAllPending
