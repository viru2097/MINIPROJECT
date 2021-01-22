import React, {useState,useEffect} from "react";
import RandomQuote from "./RandomQuote";
import SavedQuotes from "./SavedQuotes";
import AddQuote from "./AddQuote";
import ListAllQuotes from "./ListAllQuotes";
import { Nav, Navbar } from "react-bootstrap";
import {  Route, Link,useLocation,useHistory, } from "react-router-dom";
import Login from "./loginComponent.js";
import SignUp from "./signupComponent.js";




function App() {
   const location = useLocation();
   const history = useHistory();
  // console.log(location);
  
   const userLogOut= ()=>{
     
    history.push("/");
   }

  return (
    
    <>
        <center>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Quotify</Navbar.Brand>
            <Nav.Item className="ml-auto">
            {
             !["/", "/register"].includes(location.pathname)?
              <>
              <Link to="/random-quote" className="ml-4">
                Random Quote(API)
              </Link>
              <Link to="/saved-quotes" className="ml-4">
                Random Quote(Local)
              </Link>
              <Link to="/new-quote" className="ml-4">
                Add Quote
              </Link>
              <Link to="/list-all-saved-quotes" className="ml-4">
                List All Quotes(Local)
              </Link>
              <Link onClick={userLogOut} className="ml-4">LogOut</Link>
              </>
              : 
              <>
              <Link to="/" className="ml-4">Sign In</Link>
              <Link to="/register" className="ml-4">Register</Link>
              </>
              }
            
            </Nav.Item>
            
          </Navbar>
          <Route path="/" component={Login} exact={true}/>
          <Route path="/register" component={SignUp}/>
          <Route path="/random-quote" component={RandomQuote}  />
          <Route path="/saved-quotes" component={SavedQuotes} />
          <Route path="/new-quote" component={AddQuote} />
          <Route path="/list-all-saved-quotes" component={ListAllQuotes} />
          

        </center>
     
      
    </>
  );
}

export default App;
