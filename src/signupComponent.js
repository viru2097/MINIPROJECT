import React from "react";
import {useState, useEffect} from "react";
import swal from 'sweetalert';
import {useHistory} from "react-router-dom";

function SignUp(props){
    const history = useHistory();
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const syncFirstName = (e)=> setUser({...user,firstName:e.target.value});
    const syncLastName = (e)=> setUser({...user,lastName:e.target.value});
    const syncEmail = (e)=> setUser({...user,email:e.target.value});
    const syncPassword = (e)=> setUser({...user,password:e.target.value});
    const registerUser = () =>{
        if(user.firstName === "" || user.lastName === "" || user.email === "" || user.password === ""){
            swal("Oops!", "Please fill  proper details!", "error");
            return;
        }
        else
        {
            localStorage.setItem("app-user", JSON.stringify(user));
            history.push("/");
            swal("Success!", "Registered  successfully!", "success");
        }
        
    };
    return (
        <>
        <br/>
        <br/>
         <div className="outer">
              <div className="inner">
            <h3>Register</h3>
            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" value={user.firstName} onChange={syncFirstName}/>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" value={user.lastName} onChange={syncLastName} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" value={user.email} onChange={syncEmail}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={user.password} onChange={syncPassword}/>
            </div>
            <button  className="btn btn-primary btn-lg btn-block" onClick={registerUser}>Register</button>
            </div>
            </div>
        </>    
    );
}
    
 export default SignUp;    
    