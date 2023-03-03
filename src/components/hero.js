import React from "react";
import "./master.css";
import { Outlet, Link } from "react-router-dom";
const imgFit = {
  height: "200px",
  width: "100%",
  objectFit: "cover",
};
const bshad = {
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  borderColor: "transparent",
};

const HeroMain = () => {
  document.title = "ExamWiz-Zebcorp";

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide heroMain">
      <div className="hero-text">
        <h1 className="fw-bold display-5 text-white ">Share, Save, Connect</h1>
        <a href="#main" className="btn btn-outline-light fs-3 fw-bold py-2 px-3 mt-5">
          Explore Now!
        </a>
      </div>
      <div className="carousel-inner h-100">
        <div className="carousel-item active h-100" poster="8.jpg">
          <video
            muted
            loop
            className="m-0"
            style={{ width: "100%", height: "100vh", opacity: "0.6", objectFit: "cover" }}
            autoplay="true"
          >
            <source src="Free 4K Stock Videos & Full HD Video Clips to Download.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroMain;
