import React from "react";
import { useState, useEffect } from "react";
import File from "./files";
import SignUp from "./signup";
import Login from "./login";
import AddFiles from "./addfile";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "axios";

const Contribute = () => {
  const location = useLocation();
  const { check } = !location.state ? "login" : location.state;

  const [isLoading, setIsloading] = useState(false);
  const [isverified, setVerified] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);
  const [tokenres, setTokenres] = useState("");
  useEffect(() => {
    setIsloading(true);

    if (cookies.uToken !== undefined) {
      Axios.post("https://blogpro.tech/apiPhp/myFiles/verify.php?token=" + cookies.uToken)
        .then((response) => {
          setIsloading(false);
          // response.data=="ok"?setVerified(true):setVerified(false);
          if (response.data.token !== undefined) {
            setCookie("uToken", response.data.token, { path: "/" });
            setVerified(true);
          } else if (response.data == "Expired token" || response.data == "Signature verification failed" || response.data == "error") {
            setVerified(false);
            removeCookie("uToken");
          }
        })
        .catch((error) => {
          setIsloading(false);
        });
    } else {
      setVerified(false);
      setIsloading(false);
    }
  }, [cookies.uToken]);

  const [elog, setElog] = useState(false);
  return (
    <>
      {isLoading && (
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            height: "100%",
            width: "100%",
            zIndex: "98",
          }}
        >
          <img src="dogcur.gif" className="spinner display-1 position-absolute top-50 start-50 translate-middle" />
        </div>
      )}

      {((!isverified && !location.state) || (!isverified && check == "Login")) && <Login />}
      {!isverified && check == "SignUp" && <SignUp />}
      {isverified && <AddFiles logout={setVerified} />}
    </>
  );
};
export default Contribute;
