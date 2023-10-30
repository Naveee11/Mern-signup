import React, { useState } from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function LoginSign() {

    const navigate=useNavigate();
  // const dispatch =useDispatch();

  const [formData,setformData]=useState({
    name:"",
    email:"",
    password:""
  })

  const HandlesignUp = async (e)=>{
    e.preventDefault();

    

    try{
      const signresponse = await axios.post('http://localhost:5000/api/signup',formData);
      console.log( 'formdata created',signresponse.data.newSignup );
    }catch(err){
      console.error("Error in creating form data ", err)
    }

  }

  const[signLogtoggle,setsignLogtoggle]=useState(true);

  const handletoggle =()=>{
    setsignLogtoggle(!signLogtoggle)
  }

  const [logindata,setlogindata]=useState({
    loginemail:"",
    loginpassword:""

  });

  const handleLoginSubmit=async(e)=>{
    e.preventDefault();

    console.log("data to send", logindata);

    try{
      const loginresponse = await axios.post('http://localhost:5000/api/login', logindata, {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      
      const {token}=loginresponse.data;

      localStorage.setItem('token',token);

      // dispatch({type:'AUTHENTICATE_USER',token});

      navigate('/dashboard');
    }catch(err){
      console.error(err);
    }


  }


  return (
    <div>
        <div className='signlog' >
            <div className='tooglebuttons' >
                <button onClick={()=>setsignLogtoggle(false)} >login</button>
                <button onClick={()=>setsignLogtoggle(true)} >signup</button>
            </div>
            {signLogtoggle ?(
                <div className="signup">
                <form action="" onSubmit={HandlesignUp} >
                    <h1>Sign Up</h1>
                    <input type="text"  placeholder='name' value={formData.name} onChange={(e)=> setformData({...formData,name:e.target.value}) } />
                    <input type="email" placeholder='email' value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})}  />
                    <input type="password" placeholder='password' value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} />
                    <button type="submit">Submit</button>

                </form>
                </div>
            ):(
                <div className="login">
                <form action="" onSubmit={handleLoginSubmit} >

                    <h1>login</h1>
                    
                    <input type="email" name='loginemail' value={logindata.loginemail} onChange={(e)=>setlogindata({...logindata,loginemail:e.target.value})} placeholder='email' />
                    <input type="password" name='loginpassword' value={logindata.loginpassword} onChange={(e)=>setlogindata({...logindata,loginpassword:e.target.value})}  placeholder='password' />
                    <button type="submit">Submit</button>

                </form>
                </div>
            )}
        </div>
    </div>
  )
}

export default LoginSign