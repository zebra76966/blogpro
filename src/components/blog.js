import React from "react";
import Content from "./blog-content";
import "./master.css";
import { useLocation, useParams } from "react-router-dom";
import ArticleDefault from "./defualtblog";
import Article from "./readBlog";
import "./master.css";
import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Outlet, Link } from "react-router-dom";
const imgFit = {
  height: "200px",
  width: "100%",
  objectFit: "cover",
};

const nez = {
  position: "absolute",
  zIndex: "-1",
  top: "-2%",
  left: "40%",
  transform: "rotate(351deg)",
  width: "100%",
  maxWidth: "50px",
};

const Blog = () => {
  const params = useParams();
  document.title = "ExamWiz-Blog";

  const oneload = useRef(true);
  const [toggle, setToggle] = useState(false);
  const [blogdata, setBlogData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.style.background = "#212529";
      document.body.style.color = "#f8f9fa";
    } else {
      document.body.style.background = "none";
      document.body.style.color = "inherit";
    }
  }, [toggle]);

  useEffect(() => {
    Axios.post("https://blogproapi.000webhostapp.com/api.php?blog=1")
      .then((response) => response)
      .then((data) => {
        setBlogData(data.data);

        setIsloading(false);
        if (oneload.current) {
          oneload.current = false;
          toast.success("Loaded Successfully");
        }
      })
      .catch((error) => {
        toast.error("This didn't work.");
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle" style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "100%", width: "100%", zIndex: "98" }}>
          <img src="dogcur.gif" className="spinner display-1 position-absolute top-50 start-50 translate-middle" />
        </div>
      )}
      {params.id == "default" && (
        <>
          <div className="hero"></div>
          <div className="hero2"></div>
          <div className="container" style={{ marginTop: "-5%  !important" }}>
            <div className="row vh-100 d-flex align-items-center text-light">
              <div className="col-12 col-md-6">
                <h1 className="display-2 fw-bold">TECH BLOG</h1>
                <p className="lead">
                  <em>Posts about tech problems, solution, codes, algorithms etc.</em>
                  <span className="fw-bold d-block">Check them Out!</span>
                </p>
              </div>

              <div className="col-12 col-md-6 d-flex justify-content-end position-relative">
                <img src="../../thero.png" className="img-fluid" style={{ width: "100%", maxWidth: "350px" }} />
                <img src="../../nez.gif" className="img-fluid" style={nez} />
                <img src="../../gary.gif" className="img-fluid gar" />
                <img src="../../goku.gif" className="img-fluid gok" />
              </div>
            </div>
          </div>
          <div className="bg-dark py-5 ">
            <div className="container">
              <div className="row">
                {blogdata.reverse().map((ini, i) => {
                  return <Content data={ini} id={ini.id} />;
                })}

                <div className="col-12 col-md-4 my-3">
                  <div className="card boxShadow bg-dark text-light h-100">
                    <img src="../../8.jpg" className="card-img-top" style={imgFit} alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Horizontal Pixel Span - Python</h5>
                      <p className="card-text text-truncate">
                        Horizontal Pixel span also known as Seed Fill span. A topic from Computer Graphics demosstrated suing Python PIL and graphics.py module.
                      </p>
                      <Link to="/blog/def/horizontal-pixel-span" className="btn btn-warning fw-bold">
                        Read More. . .
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {params.id == "def" && <ArticleDefault />}

      {blogdata.reverse().map((ini, i) => {
        return params.title.replaceAll("_", " ") == ini.heading.trim() && <Article data={ini} id={ini.id} />;
      })}
    </>
  );
};

export default Blog;
