import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../scenes/Auth/LoginPage'
import RegisterPage from '../scenes/Auth/RegisterPage'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from '../theme'
import Team from '../scenes/team'
import Contacts from '../scenes/contacts'
import Invoices from '../scenes/invoices'
import Profile from '../scenes/profile/Profile'
import Form from '../scenes/form'
import Bar from '../scenes/bar'
import Pie from '../scenes/pie'
import Line from '../scenes/line'
import FAQ from '../scenes/faq'
import Calendar from '../scenes/calendar/calendar'
import Geography from '../scenes/geography'
import HomePage from '../pages/HomePage'
import { useEffect } from 'react'
import axios from 'axios'
import AppURL from '../api/AppURL'
import { useState } from 'react'

function AppRoute(){
    const [theme, colorMode] = useMode();   
    const [user, setUser] = useState({});

    useEffect(() => {
        window.scroll(0,0);

        axios.get(AppURL.UserData).then(response => {
            setUser(response.data)
        }).catch(error => {
      
        });
    });

    return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/" element={<HomePage user={user}/>} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/contacts" element={<Contacts />} />
              <Route exact path="/invoices" element={<Invoices />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/form" element={<Form />} />
              <Route exact path="/bar" element={<Bar />} />
              <Route exact path="/pie" element={<Pie />} />
              <Route exact path="/line" element={<Line />} />
              <Route exact path="/faq" element={<FAQ />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
        
        // {/* <NavMenuDesktop user={this.state.user} setUser={this.setUser}/> */}

        
        // {/* <Route exact path="/forget" element={<ForgetPasswordPage />} /> */}
        // {/* <Route exact path="/reset/:pincode" element={<ResetPasswordPage />} /> */}
        // {/* <Route exact path="/profile" element={<ProdilePage user={this.state.user} setUser={this.setUser}/>} /> */}
        // {/* <Route exact path="/logout" element={<ProdilePage user={this.state.user} setUser={this.setUser}/>} /> */}
        // {/* <Route exact path="/contact" element={<ContactPage />} /> */}
        // {/* <Route exact path="/purchase" element={<PurchasePage />} /> */}
        // {/* <Route exact path="/privacy" element={<PrivacyPage />} /> */}
        // {/* <Route exact path="/about" element={<AboutPage />} /> */}
        // {/* <Route exact path="/refund" element={<RefundPage />} /> */}
        // {/* <Route exact path="/productdetails/:code" element={<ProductDetailPage user={this.state.user}/>} /> */}
        // {/* <Route exact path="/notification" element={<NotificationPage />} /> */}
        // {/* <Route exact path="/favourite" element={<FavouritePage user={this.state.user}/>} /> */}
        // {/* <Route exact path="/cart" element={<Cart user={this.state.user}/>} /> */}
        // {/* <Route exact path="/productcategory/:category" element={<ProductCategoryPage1 />} /> */}
        // {/* <Route exact path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage />} /> */}
        // {/* <Route exact path="/notification" element={<NotificationPage />} /> */}
        // {/* <Route exact path="/productbysearch/:searchkey" element={<Search />} /> */}
        // {/* <Route exact path="/orderlist" element={<OrderListPage user={this.state.user}/>} /> */}
    ); 
        
}

export default AppRoute;
