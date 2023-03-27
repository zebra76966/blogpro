import React from "react";
import "./master.css";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeroMain from "./hero";
import SemCard from "./semcard";
import Content from "./blog-content";
const imgFit = {
  height: "200px",
  width: "100%",
  objectFit: "cover",
};
const bshad = {
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  borderColor: "transparent",
};

const Main = () => {
  document.title = "ExamWiz-Zebcorp";

  const [greetGif, setGreetgif] = useState([]);
  const [currentSem, setCurrentSem] = useState("BCA");
  const [blogdata, setBlogData] = useState([]);

  useEffect(() => {
    Axios.post("https://blogproapi.000webhostapp.com/api.php?blog=1")
      .then((response) => response)
      .then((data) => {
        setBlogData(data.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("https://api.giphy.com/v1/gifs/search?api_key=3MWBMpOdbY9zSTN836gICsnEI5jUh5r0&q=computer&limit=50&offset=0&rating=g&lang=en")
      .then((response) => response)
      .then((data) => setGreetgif(data.data));
  }, []);

  return (
    <div className="bgGradientDark">
      <HelmetProvider>
        <Helmet>
          <title>ExamWiz-ZebCorp</title>
          <meta name="description" content="HUB for Old Question Papers" />
          <meta name="keywords" content="HPU, Shimla, PDFs, downloads, pdf, zebcorp, Himachal-Pradesh-University, BCA, MCA, BBA, BSC, latest, New, repeated, Old, Question Papers, Exams" />
        </Helmet>
      </HelmetProvider>
      <HeroMain />
      <div className="container mt-5 px-4 overflow-hidden " id="main">
        <header className="text-center">
          <h1 className="display-3">
            Welcome! <span className="text-danger">❤</span>
          </h1>
          <p className="lead">Download old question papers Here!</p>
          <p className="text-info">If you want to contribute simply go to contribute tab.</p>
        </header>
        <hr />
        <main>
          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="sideButtons">
                <button className={`btn  fw-bold ${currentSem == "BCA" ? "btn-info" : "btn-dark"}`} onClick={() => setCurrentSem("BCA")}>
                  BCA
                </button>
                <button className={`btn  fw-bold ${currentSem == "BBA" ? "btn-info" : "btn-dark"}`} onClick={() => setCurrentSem("BBA")}>
                  BBA
                </button>
                <button className={`btn  fw-bold ${currentSem == "BA" ? "btn-info" : "btn-dark"}`} onClick={() => setCurrentSem("BA")}>
                  BA
                </button>
                <button className={`btn  fw-bold ${currentSem == "BSC" ? "btn-info" : "btn-dark"}`} onClick={() => setCurrentSem("BSC")}>
                  BSC
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-12 row">
              <SemCard sem={currentSem} />
            </div>
          </div>

          <article>
            <p className="fw-light mt-5 fs-3 text-center">Check out our blog. We have articles from students about programming, algorithms, technology and more!</p>
            <div className="bg-none py-3 ">
              <div className="container">
                <p className="fw-light mt-5 fs-4 fw-bold text-start">Recent Blogs</p>

                <div className="row">
                  {blogdata.slice(0, 3).map((ini, i) => {
                    return <Content data={ini} id={ini.id} key={ini.id} />;
                  })}
                </div>
                <div className="w-100 text-end">
                  <Link to="/blog/default/default" className="btn btn-info fw-bold px-4 ">
                    More...
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>
        <footer>
          <hr className="my-5" />
          <p className="py-5 text-lead text-center">
            Created by @zeb_corp with <span className="text-danger">❤</span>
          </p>
        </footer>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
