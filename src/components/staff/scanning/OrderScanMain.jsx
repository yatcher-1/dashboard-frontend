import { Fragment, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Topbar from "../../../scenes/global/Topbar";
import OrderScanAll from "./OrderScanAll";
import SidebarStaff from "../SidebarStaff";
import SidebarAdmin from "../../admin/SidebarAdmin";
import OrderScanAllPending from "./OrderScanAllPending";
import OrderScanAllScanned from "./OrderScanAllScanned";
import OrderScanning from "./OrderScanning";

const OrderScanMain = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const data =  JSON.parse(localStorage.getItem('user'));
  const role = data.role;
  const firm = data.firm;
  
  if(!localStorage.getItem('token')){
      return <Navigate to="/login" />
  }

  if(role === "admin"){
    if(location.pathname === "/orderpending"){
    return(
      <Fragment> 
        <div className="app">
        <SidebarAdmin isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <OrderScanAllPending  firm={firm} />
        </main>
      </div>
      </Fragment>
  )
}else if(location.pathname === "/orderscanning"){
  return(
    <Fragment>
      <div className="app">
      <SidebarAdmin isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanAll  firm={firm} />
      </main>
    </div>
    </Fragment>
)
}else if(location.pathname === "/orderscanned"){
  return(
    <Fragment>
      <div className="app">
      <SidebarAdmin isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanAllScanned  firm={firm} />
      </main>
    </div>
    </Fragment>
)
}else{
  return(
    <Fragment>
      <div className="app">
      <SidebarAdmin isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanAll firm={firm} />
      </main>
    </div>
    </Fragment>
)
}
} else if(role === "staff"){
    if(location.pathname === "/orderpending"){
    return(
      <Fragment>
        <div className="app">
        <SidebarStaff isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <OrderScanAllPending  firm={firm} />
        </main>
      </div>
      </Fragment>
    )
}else if(location.pathname === "/orderscanning"){
  return(
    <Fragment>
      <div className="app">
      <SidebarStaff isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanning  firm={firm} />
      </main>
    </div>
    </Fragment>
)
}else if(location.pathname === "/orderscanned"){
  return(
    <Fragment>
      <div className="app">
      <SidebarStaff isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanAllScanned  firm={firm} />
      </main>
    </div>
    </Fragment>
)
}else{
  return(
    <Fragment>
      <div className="app">
      <SidebarStaff isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <OrderScanAll firm={firm} />
      </main>
    </div>
    </Fragment>
)
  } 
}
}

export default OrderScanMain;
