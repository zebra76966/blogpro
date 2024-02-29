import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
const Login = () => {
  document.title = "ExamWiz-Login";

  // Linkedin shananingans Starts==>
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const states = urlParams.get("state");

    if (code !== null) {
      console.log(code);
      const payload = {
        "Content-Type": "application/x-www-form-urlencoded",
        client_id: "86lh81ek7qe4xe",
        client_secret: "5a0wqOmj4p3iSMEu",
        grant_type: "authorization_code",
        code: { code },
        state: states,
        redirect_uri: "https://blogpro-sooty.vercel.app/contribute",
      };
      console.log(payload);

      // Use this end point in your backend running from here will throw CORS err
      Axios.post(`https://www.linkedin.com/oauth/v2/accessToken`, {}, payload)
        .then((response) => {
          // Access token
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Linked in shananingans End===>

  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);
  const [response, setResponse] = useState([]);
  const [tresponse, setTresponse] = useState("");
  const [udata, setUdata] = useState({
    uemail: "",
    pw: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    const FD = new FormData(document.getElementById("uform"));
    let formData = new FormData(); //formdata object

    FD.append("uemail", udata.uemail);
    FD.append("upw", udata.pw); //append the values with key, value pair
    // FD.append('age', 20);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setTresponse("");
    Axios.post("https://blogpro.tech/apiPhp/myFiles/apiSignIn.php", FD, config)
      .then((response) => {
        typeof response.data == "string" ? setTresponse(response.data) : setResponse(response.data);
        response.length !== 0 && setCookie("uToken", response.data.token, { path: "/" });
        setUdata({ uemail: "", pw: "" });
      })
      .catch((error) => {
        setResponse(error.message);
      });
  };

  return (
    <motion.div
      className="card"
      style={{ background: "transparent", border: "none" }}
      initial={{ top: "-100%" }}
      animate={{ top: "auto" }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 0,
        duration: 0.5,
      }}
    >
      <div className="d-flex h-100 align-items-center justify-content-center">
        <form id="uform" onSubmit={handlesubmit} className="row g-3 col-11 col-md-5 p-4 my-5 text-light rounded" style={{ background: "#36393f" }}>
          <h3 className="fw-bold">Login</h3>
          {tresponse.length !== 0 && <p className="fw-bold text-info">{tresponse}</p>}

          <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86lh81ek7qe4xe&redirect_uri=https://blogpro-sooty.vercel.app/contribute&scope=openid,profile,email">
            Login linkedin
          </a>
          <hr />
          <div className="col-12">
            <label for="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0 p-3"
              id="Email"
              autoComplete="new-email"
              placeholder="John@email.com"
              value={udata.uemail}
              onChange={(e) => setUdata({ ...udata, uemail: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0 p-3"
              id="Password"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              value={udata.pw}
              onChange={(e) => setUdata({ ...udata, pw: e.target.value })}
            />
          </div>

          <div className="col-12 py-2">
            <button type="submit" className="btn w-100 fw-bold py-2 btn-lg btn-primary">
              Continue
            </button>
          </div>
          <p className="lead">
            Don't have an Account?
            <Link to="/contribute" state={{ check: "SignUp" }} className="link-info text-decoration-none fw-bold">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
        <Outlet />
      </div>
    </motion.div>
  );
};
export default Login;
