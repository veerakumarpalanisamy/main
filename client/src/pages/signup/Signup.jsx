import React, { useState } from 'react'
import "./signup.css"
import { useNavigate }  from "react-router-dom"

const Signup = () => {   
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState(undefined);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data= await response.json();
      setUserData(data);
      navigate("/signin")
    } catch (err){
      console.log(err);
      return;
    }
  };
    
  return (
    <div>
      <h1>create an account</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' id='username' onChange={handleChange}/>
        <input type="text" placeholder='email' name='email' id='email' onChange={handleChange}/>
        <input type="text" placeholder='password' name='password' id='password' onChange={handleChange}/>
        <input type="file" />
        <button>Submit</button>
        <br />
       
      </form>
      <button onClick={() => navigate("/signin")}>
          already have an account 
        </button>
      {userData ? <p> {userData.user.username}</p>: ""}  
    </div>
  );
};

export default Signup;