import React from 'react';
import './master.css'
import {Outlet, Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import Axios from 'axios';
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
  const [greetGif, setGreetgif]= useState([]);

  useEffect(()=>{
    Axios.get("https://api.giphy.com/v1/gifs/search?api_key=3MWBMpOdbY9zSTN836gICsnEI5jUh5r0&q=computer&limit=50&offset=0&rating=g&lang=en")
    .then(response=>response)
    .then(data=>setGreetgif(data.data))
  },[])


  return(
    <div className="container mt-5 px-4 overflow-hidden">

      <div className="row justify-content-around">

      <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
        <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
        <div className="card-body bg-dark text-light">
          <h5 className="card-title">BCA 6<sup>th</sup> Semester</h5>
          <p className="card-text">Old BCA 6<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
          <Link to="/downloads" state={{ grade: "BCA 6" }} className="btn btn-primary">Downloads</Link>
        </div>
      </div>


        <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 5<sup>th</sup> Semester</h5>
            <p className="card-text">Old BCA 5<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 5" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>


        <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 4<sup>th</sup> Semester</h5>
            <p className="card-text">Old BCA 4<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 4" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>

        <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 3<sup>rd</sup> Semester</h5>
            <p className="card-text">Old BCA 3<sup>rd</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 3" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>


        <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 2<sup>nd</sup> Semester</h5>
            <p className="card-text">Old BCA 2<sup>nd</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 2" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>

        <div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}>
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 1<sup>st</sup> Semester</h5>
            <p className="card-text">Old BCA 1<sup>st</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 1" }} className="btn btn-primary">Downloads</Link>
          </div>
        </div>

      </div>
      <Outlet/>
    </div>


  );
}

export default Main;
