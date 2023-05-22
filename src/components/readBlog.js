import React from "react";
import { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./master.css";
import RichEditor from "./editor";
import { EditorState, convertFromRaw } from "draft-js";
import { Link, Outlet } from "react-router-dom";
import Content from "./blog-content";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Article = (props) => {
  const [toggle, setToggle] = useState(false);
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

  const [blogdata, setBlogData] = useState([]);
  const oneload = useRef(true);

  useEffect(() => {
    setIsloading(true);
    Axios.post("https://blogpro.tech/api.php?blog=1")
      .then((response) => response)
      .then((data) => {
        setBlogData(data.data.reverse());
        setIsloading(false);
        if (oneload.current) {
          oneload.current = false;
          toast.success("Loaded Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        toast.error("Something Went Wrong");
      });
  }, []);

  return (
    <>
      <Toaster />
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
          <img
            src="/../dogcur.gif"
            className="spinner display-1 position-absolute top-50 start-50 translate-middle"
          />
        </div>
      )}
      <div className="position-absolute" style={{ zIndex: 99, top: "50%", left: "2%" }}>
        <div id="wrapperShare">
          <button className="shareBtn" id="toggler">
            <i className="fa-solid fa-share"></i>
          </button>
          <a
            className="btn shareBtn fs-3"
            href={`https://www.facebook.com/sharer/sharer.php?u=https://blogpro-sooty.vercel.app/blog/${
              props.id
            }/${encodeURIComponent(props.data.heading.trim().replaceAll(" ", "_"))}`}
            id="a"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            className="btn shareBtn fs-3"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blogpro-sooty.vercel.app/blog/${
              props.id
            }/${encodeURIComponent(props.data.heading.trim().replaceAll(" ", "_"))}`}
            id="b"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            className="btn shareBtn fs-3"
            href={`http://twitter.com/share?text=${
              props.data.heading
            }&url=https://blogpro-sooty.vercel.app/blog/${props.id}/${encodeURIComponent(
              props.data.heading.trim().replaceAll(" ", "_")
            )}`}
            id="c"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>

      <label className="dbtn">
        <input
          type="checkbox"
          id="dmode"
          defaultChecked={toggle}
          onChange={(e) => {
            setToggle(!toggle);
          }}
        />
        <span className="slider boxShadow"></span>
      </label>

      <HelmetProvider>
        <Helmet>
          <title>{(document.title = props.data.heading)}</title>
          <meta name="description" content={props.data.heading} />
          <meta name="keywords" content={props.data.tags} />
          <meta name="news_keywords" content={props.data.tags} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
      </HelmetProvider>
      <header className="container my-5">
        <h1 className="display-3 fw-bold">
          {props.data.heading} <span className="d-block fw-light">{props.data.subheading}</span>
        </h1>
        <div
          className="d-flex align-middle align-items-center justify-content-between"
          style={{ maxWidth: "350px" }}
        >
          <p className="lead m-0">By {props.data.author}</p>

          <a className="btn fs-5 rounded-pill btn-outline-info" href={props.data.fb}>
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="btn fs-5 rounded-pill btn-outline-info" href={props.data.insta}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="btn fs-5 rounded-pill btn-outline-info" href={props.data.linked}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <figcaption className="blockquote-footer m-0">
          <cite title="Source Title">{props.data.date}</cite>
        </figcaption>
      </header>
      <hr />
      <main className="container my-5 fs-5">
        <RichEditor
          viewState={EditorState.createWithContent(convertFromRaw(props.data.contents))}
          viewBox={false}
          readOnly={true}
        />
      </main>

      {/* Recent blogs start */}
      <div className="bg-none py-3 ">
        <div className="container">
          <hr />
          <p className="fw-light mt-5 fs-4 fw-bold text-start">Recent Blogs</p>

          <div className="row">
            {blogdata.slice(0, 3).map((ini, i) => {
              return <Content data={ini} id={ini.id} key={i} />;
            })}
          </div>
          <div className="w-100 text-end">
            <Link to="/blog/default/default" className="btn btn-info fw-bold px-4 ">
              More...
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Article;
