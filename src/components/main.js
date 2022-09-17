import React from 'react';
import './master.css'
import {Outlet, Link} from 'react-router-dom';
const imgFit={
  height:"200px",
  width:"100%",
  objectFit:"cover"
}
const bshad={
  boxShadow:"0 0 10px rgba(0,0,0,0.3)",
  borderColor:"transparent"
}

const Main=()=>{

  return(
    <div className="container mt-5 overflow-hidden">
      <div className="row justify-content-around">
        <div className="card col-lg-5 p-0 rounded" style={bshad}>
          <img src="logo512.png" className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 5<sup>th</sup> Semester</h5>
            <p className="card-text">Old BCA 5<sup>th</sup> Semester examination question paper. Click on download button to go to the downlaod page.</p>
            <Link to="/downloads" state={{ grade: "BCA 5" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>


  );
}

export default Main;
