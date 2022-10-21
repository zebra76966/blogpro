import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import {Outlet, Link} from 'react-router-dom';
import {motion} from "framer-motion";
const Login=()=>{

document.title="ExamWiz-Login"

const [cookies, setCookie, removeCookie] = useCookies(['uToken']);
const [response, setResponse]= useState([]);
const [tresponse, setTresponse]= useState('');
const [udata, setUdata]=useState({
  uemail:"",
  pw:""
})

const handlesubmit=(e)=>{
  e.preventDefault();
  const FD = new FormData(document.getElementById('uform'));
  let formData = new FormData();    //formdata object

  FD.append('uemail',udata.uemail);
  FD.append('upw',udata.pw);    //append the values with key, value pair
  // FD.append('age', 20);
  const config = {
      headers: { 'content-type': 'multipart/form-data' }
  }
  setTresponse('');
  Axios.post("https://zebra.42web.io/apiPhp/myFiles/apiSignIn.php", FD, config)
      .then(response => {
          typeof response.data=="string"?setTresponse(response.data):setResponse(response.data);
          response.length!==0&&setCookie('uToken', response.data.token, { path: '/' });
          setUdata({uemail:'',pw:''});
        })
      .catch(error => {
          setResponse(error.message);
      });
}

  return(
    <motion.div className="card" style={{background:"transparent", border:"none"}}
      initial={{top:"-100%"}}
      animate={{top:"auto"}}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 0,
        duration: 0.5,}
     }
     >
      <div className="d-flex h-100 align-items-center justify-content-center">

        <form id="uform" onSubmit={handlesubmit} className="row g-3 col-11 col-md-5 p-4 my-5 text-light rounded" style={{background:"#36393f"}}>
        <h3 className="fw-bold">Login</h3>
          {tresponse.length!==0&&<p className="fw-bold text-info">{tresponse}</p>}
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

          <div className="col-12 py-2">
            <button type="submit" className="btn w-100 fw-bold py-2 btn-lg btn-primary">Continue</button>
          </div>
          <p className="lead">Don't have an Account?
            <Link to="/contribute" state={{ check: "SignUp" }} className="link-info text-decoration-none fw-bold"> Sign Up</Link>
          </p>
        </form>
        <Outlet/>
      </div>
    </motion.div>

  )
}
export default Login;
