import React from "react";
import "./master.css";
import { Outlet, Link } from "react-router-dom";
const imgFit = {
  height: "200px",
  width: "100%",
  objectFit: "cover",
};

const Content = (props) => {
  var bg = "/blog/" + props.id + "/" + encodeURIComponent(props.data.heading.trim().replaceAll(" ", "_"));
  return (
    <>
      <div className="col-12 col-md-4 my-3">
        <div className="card boxShadow bg-dark text-light h-100">
          <img src={props.data.bimg} className="card-img-top" style={imgFit} alt="..." />
          <div className="card-body">
            <h5 className="card-title text-truncate">{props.data.heading}</h5>
            <p className="card-text text-truncate">{props.data.subheading}</p>
            <Link to={bg} className="btn btn-warning fw-bold">
              Read More. . .
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Content;
