import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import {Outlet, Link} from 'react-router-dom';

const SignUp=()=>{

const [response, setResponse]= useState('');

const [udata, setUdata]=useState({
  uname:"",
  uemail:"",
  pw:""

})

const handlesubmit=(e)=>{
  e.preventDefault();
  const FD = new FormData(document.getElementById('uform'));
  let formData = new FormData();    //formdata object

  FD.append('uname',udata.uname);
  FD.append('uemail',udata.uemail);
  FD.append('upw',udata.pw);    //append the values with key, value pair
  // console.log([...FD.entries()]);
  // FD.append('age', 20);

  const config = {
      headers: { 'content-type': 'multipart/form-data' }
  }

  Axios.post("https://zebra.42web.io/apiSignup.php", FD, config)
      .then(response => {
          setResponse(response.data);
          setUdata({uname:'',uemail:'',pw:''});
        })
      .catch(error => {
          setResponse(error.message);
      });
}

  return(
    <div className="d-flex h-100 align-items-center justify-content-center">

      <form id="uform" onSubmit={handlesubmit} className="row g-3 col-11 col-md-5 p-4 my-5 text-light rounded" style={{background:"#36393f"}}>
      <h3 className="fw-bold">Sign Up</h3>
        {response!==''&&<p className="fw-bold text-info">{response}</p>}
      <hr/>
        <div className="col-12">
          <label for="Email" className="form-label">Email</label>
          <input type="email" className="form-control bg-dark text-light border-0 p-3" id="Email" autoComplete="new-email"
          placeholder="John@email.com"
          value={udata.uemail}
          onChange={(e)=>setUdata({...udata,uemail:e.target.value})}
          />
        </div>
        <div className="col-12">
          <label for="Password" className="form-label">Password</label>
          <input type="password" className="form-control bg-dark text-light border-0 p-3" id="Password" autoComplete="new-password"
          placeholder="Minimum 8 characters"
          value={udata.pw}
          onChange={(e)=>setUdata({...udata,pw:e.target.value})}
          />
        </div>
        <div className="col-12">
          <label for="UserName" className="form-label">UserName</label>
          <input type="text" className="form-control bg-dark text-light border-0 p-3" id="UserName" placeholder="John Jacobs"
          autoComplete="off"
          value={udata.uname}
          onChange={(e)=>setUdata({...udata,uname:e.target.value})}
          />
        </div>

        <div className="col-12 py-2">
          <button type="submit" className="btn w-100 fw-bold py-2 btn-lg btn-primary">Continue</button>
        </div>
        <p className="lead">Already have an Account?
          <Link to="/contribute" state={{ check: "Login" }} className="link-info text-decoration-none fw-bold"> Login</Link>
        </p>

      </form>

    </div>

  )
}
export default SignUp;
