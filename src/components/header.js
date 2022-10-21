import React from 'react';
import './master.css';
import {Outlet, Link} from 'react-router-dom';
const Header=()=>{

  return(
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark boxShadow">
      <div className="container-fluid px-3 py-2">
        <a className="navbar-brand fs-5 fw-bold" href="#">ZC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item px-lg-3">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item px-lg-3">
              <Link to="/downloads" className="nav-link">Downloads</Link>
            </li>
            <li className="nav-item px-lg-3">
              <Link to="/blog/default" className="nav-link">Blog</Link>
            </li>
            <li className="nav-item px-lg-3">
              <Link to="/contribute" className="nav-link">Contribute</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet/>
</>

  );

}

export default Header;
