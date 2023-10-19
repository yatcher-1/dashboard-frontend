import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import Topbar from "../global/Topbar";
import ProfilePage from "./ProfilePage";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import SidebarStaff from "../../components/staff/SidebarStaff";

const Profile = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  const data =  JSON.parse(localStorage.getItem('user'));
  const role = data.role;

  if(!localStorage.getItem('token')){
      return <Navigate to="/login" />
  }

  if(role === "admin"){
    return(
      <Fragment>
        <div className="app">
        <SidebarAdmin isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <ProfilePage />
        </main>
      </div>
      </Fragment>
  )}
  else if(role === "staff"){
    return(
      <Fragment>
        <div className="app">
        <SidebarStaff isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <ProfilePage />
        </main>
      </div>
      </Fragment>
  )
  }
}

export default Profile;
