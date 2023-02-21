import React from "react";
import "./master.css";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { motion } from "framer-motion";
import HeroMain from "./hero";
const imgFit = {
  height: "200px",
  width: "100%",
  objectFit: "cover",
};
const bshad = {
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  borderColor: "transparent",
};

const SemCard = (props) => {
  document.title = "ExamWiz-Zebcorp";

  const [greetGif, setGreetgif] = useState([]);
  const selected = props.sem == "BCA" || props.sem == "BBA" ? 6 : 3;

  useEffect(() => {
    Axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=3MWBMpOdbY9zSTN836gICsnEI5jUh5r0&q=${
        props.sem == "BCA" ? "computers" : ""
      }
      ${props.sem == "BBA" ? "business" : ""}
      ${props.sem == "BA" ? "history" : ""}
      ${props.sem == "BSC" ? "science" : ""}}&limit=50&offset=0&rating=g&lang=en`
    )
      .then((response) => response)
      .then((data) => setGreetgif(data.data));
  }, [props.sem]);

  return (
    <>
      {[...Array(selected)].map((e, i) => {
        return (
          <div className="col-12 col-lg-6">
            <motion.div
              className="card col-12 col-lg-5 my-3 p-0 rounded w-100"
              style={bshad}
              initial={{ left: "-100%" }}
              animate={{ left: "inherit" }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0,
                duration: 0.5,
              }}
            >
              <img
                src={
                  greetGif.length !== 0
                    ? greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url
                    : "logo512.png"
                }
                className="card-img-top img-fluid"
                style={imgFit}
                alt="..."
              />
              <div className="card-body bg-dark text-light">
                <h5 className="card-title">
                  {props.sem} {i + 1}
                  <sup>
                    {i + 1 > 3 ? "th" : ""}
                    {i + 1 == 1 ? "rst" : ""}
                    {i + 1 == 2 ? "nd" : ""}
                    {i + 1 == 3 ? "rd" : ""}
                  </sup>{" "}
                  {props.sem == "BBA" || props.sem == "BCA" ? "Semester" : "Year"}
                </h5>
                <p className="card-text">
                  {props.sem} {i + 1}
                  <sup>
                    {i + 1 > 3 ? "th" : ""}
                    {i + 1 == 1 ? "rst" : ""}
                    {i + 1 == 2 ? "nd" : ""}
                    {i + 1 == 3 ? "rd" : ""}
                  </sup>{" "}
                  {props.sem == "BBA" || props.sem == "BCA" ? "Semester" : "Year"} examination question paper. Click on
                  download button to go to the download page.
                </p>
                <Link to="/downloads" state={{ grade: `${props.sem} ${i + 1}` }} className="btn btn-info  fw-bold">
                  Downloads <i className="fa fa-download ps-1"></i>
                </Link>
              </div>
            </motion.div>
          </div>
        );
      })}
      <Outlet />
    </>
  );
};

export default SemCard;
