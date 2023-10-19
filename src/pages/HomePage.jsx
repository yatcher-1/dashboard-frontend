import React from 'react'
import { Fragment } from 'react'
import { useState } from 'react';
import Topbar from '../scenes/global/Topbar';
import { Navigate } from 'react-router-dom';
import DashboardStaff from '../components/staff/DashboardStaff';
import DashboardAdmin from '../components/admin/DashboardAdmin';
import SidebarAdmin from '../components/admin/SidebarAdmin';
import SidebarStaff from '../components/staff/SidebarStaff';

const HomePage = (props) => {
    const user = props.user;
    const [isSidebar, setIsSidebar] = useState(true);
    
    if(!localStorage.getItem('token')){
      return <Navigate to="/login" />
    }
  
    const data =  JSON.parse(localStorage.getItem('user'));
    const role = data.role;


    if(role === "admin"){
        return (
          <Fragment>
            <div className="app">
            <SidebarAdmin isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} user={user}/>
              <DashboardAdmin />
            </main>
          </div>
          </Fragment>
      )
    } else if(role === "staff"){
        return (
          <Fragment>
            <div className="app">
            <SidebarStaff isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} user={user}/>
              <DashboardStaff />
            </main>
          </div>
          </Fragment>
        )  
    }else{
      return <Navigate to="/login" />
    }
  }


export default HomePage
