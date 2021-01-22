import React, { Component, useState } from "react";
import swal from "sweetalert";
import {useHistory} from "react-router-dom";

function Login(){

    const history = useHistory();
    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const syncEmail = (e)=>setUser({...user,email:e.target.value});
    const syncPassword = (e)=>setUser({...user,password:e.target.value});

    const handleLogin=(e)=>{
        e.preventDefault();
        if(user.email === "" || user.password === "")
        {
            swal("Oops!","Please Fill Details","error");
            return;
        }
        else
        {
            const localData = JSON.parse(localStorage.getItem("app-user"));
            if(localData.email !== user.email)
            swal("Error","No Such user found","error");
            
            else{
                if(localData.password !== user.password)
                {
                    swal("Error","Password is incorrect","error");
                }
                else
                {
                   
                    setTimeout(() => {
                        history.push("/random-quote");
                    }, 2000);
                    swal("Success","Login Successfull","success");
                }
            }
            
        }
        
    };
        return (
            <>
            <br/>
            <br/>
            <div className="outer">
            <div className="inner">
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  value={user.email}onChange={syncEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"value={user.password} onChange={syncPassword}/>
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={handleLogin}>Sign in</button>
                
            </form>
            </div>
            </div>
            </>
        );
    }


export default Login;