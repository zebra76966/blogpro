import React from 'react';
import './master.css'
import {Outlet, Link} from 'react-router-dom';
const imgFit={
  height:"200px",
  width:"100%",
  objectFit:"cover"
}

const Content=()=>{
  var bg= "/blog/"+'horizontal-pixel-span'
  return(
    <>
      <div className="col-12 col-md-4 my-3">
        <div className="card boxShadow bg-dark text-light">
          <img src="../8.jpg" className="card-img-top" style={imgFit} alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Horizontal Pixel Span - Python</h5>
            <p className="card-text text-truncate">Horizontal Pixel span also known as Seed Fill span. A topic from Computer Graphics demosstrated suing Python PIL and graphics.py module.</p>
            <Link to={bg} className="btn btn-warning fw-bold">Read More. . .</Link>
          </div>
        </div>
      </div>
      <Outlet/>
    </>
  );
}

export default Content;
