import React, { useState } from 'react'
import "./signin.css"
import { useNavigate } from "react-router-dom"

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formUpdateDate, setFormUpdateData] = useState({
    username: "",
    email: "",
    password: ""
  })
  // const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateChange = (e) => {
    setFormUpdateData({
      ...formUpdateDate,
      [e.target.name]: e.target.value
    })
  }

  const handlesignout = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      console.log(data)
      setCurrentUser(data.validUser)
      console.log(currentUser)
    } catch (err) {
      console.log(err);
      return;
    }
  }; 

  console.log(currentUser)
  const handleUpdateSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(formUpdateDate),

      })
      const data = await response.json()
      console.log(data)
    }
    catch(err) {
      console.log(err)
    }
  };


  const handleDeleteSubmit = async (e) => {
    e.preventDefault()
    try{
       const response = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers:{
          "Content-Type": "application/json"
        }
       })
       console.log(response)
    }
    catch(err){
       console.log(err)
    }
  }




  return (
    <div>
      <h1>login user account</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='email' name='email' id='email' onChange={handleChange} />
        <input type="text" placeholder='password' name='password' id='password' onChange={handleChange} />
        <input type="file" />
        <button>Submit</button>

        <br />

      </form>
      <button onClick={handlesignout}>signout</button>



      <div>
        <form action="" onSubmit={handleUpdateSubmit}>
          <input type="text" placeholder='username' name='username' id='username' onChange={handleUpdateChange} />

          <input type="text" placeholder='email' name='email' id='email' onChange={handleUpdateChange} />
          <input type="text" placeholder='password' name='password' id='password' onChange={handleUpdateChange} />
          <button>submit</button>
        </form>
      </div>


  <div>
  <form action="" onSubmit={handleDeleteSubmit}>
    <button>DELETE</button>
  </form>
  </div>
    </div>
  );
};





export default Signin;