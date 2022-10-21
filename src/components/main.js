import React from 'react';
import './master.css'
import {Outlet, Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import Axios from 'axios';
import {motion} from "framer-motion";
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
  document.title="ExamWiz-Zebcorp"

  const [greetGif, setGreetgif]= useState([]);

  useEffect(()=>{
    Axios.get("https://api.giphy.com/v1/gifs/search?api_key=3MWBMpOdbY9zSTN836gICsnEI5jUh5r0&q=computer&limit=50&offset=0&rating=g&lang=en")
    .then(response=>response)
    .then(data=>setGreetgif(data.data))
  },[])


  return(
    <div className="container mt-5 px-4 overflow-hidden">
      <header className="text-center">
        <h1 className="display-3">Welcome! <span className="text-danger">❤</span></h1>
        <p className="lead">Download old Bachelors of Computer Applications question papers Here!</p>
        <p className="text-info">If you want to contribute simply go to contribute tab.</p>
      </header>
      <hr/>
    <main>
      <div className="row justify-content-around">

      <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
        initial={{left:"-100%"}}
        animate={{left:"inherit"}}
        transition={{
           type: "spring",
           stiffness: 100,
           delay: 0,
           duration: 0.5,}
       }
        // exit={{left:"-100%"}}
      >
        <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
        <div className="card-body bg-dark text-light">
          <h5 className="card-title">BCA 6<sup>th</sup> Semester</h5>
          <p className="card-text">Old BCA 6<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
          <Link to="/downloads" state={{ grade: "BCA 6" }} className="btn btn-primary">Downloads</Link>
        </div>
      </motion.div>


        <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
          initial={{right:"-100%"}}
          animate={{right:"0%"}}
          transition={{
             type: "spring",
             stiffness: 100,
             delay: 0.5,
             duration: 0.5,}
         }
          // exit={{right:"-100%"}}
        >
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 5<sup>th</sup> Semester</h5>
            <p className="card-text">Old BCA 5<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 5" }} className="btn btn-primary">Downloads</Link>
          </div>
        </motion.div>


        <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
          initial={{left:"-100%"}}
          animate={{left:"0%"}}
          transition={{
             type: "spring",
             stiffness: 100,
             delay: 0.1,
             duration: 0.5,}
           }
          // exit={{left:"-100%"}}
        >
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 4<sup>th</sup> Semester</h5>
            <p className="card-text">Old BCA 4<sup>th</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 4" }} className="btn btn-primary">Downloads</Link>
          </div>
        </motion.div>

        <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
          initial={{right:"-100%"}}
          animate={{right:"0%"}}
          transition={{
             type: "spring",
             stiffness: 100,
             delay: 0.6,
             duration: 0.5,}
         }
          // exit={{right:"-100%"}}
        >
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 3<sup>rd</sup> Semester</h5>
            <p className="card-text">Old BCA 3<sup>rd</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 3" }} className="btn btn-primary">Downloads</Link>
          </div>
        </motion.div>


        <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
          initial={{left:"-100%"}}
          animate={{left:"0%"}}
          transition={{
             type: "spring",
             stiffness: 100,
             delay: 0.3,
             duration: 0.5,}
         }
          // exit={{left:"-100%"}}
        >
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 2<sup>nd</sup> Semester</h5>
            <p className="card-text">Old BCA 2<sup>nd</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 2" }} className="btn btn-primary">Downloads</Link>
          </div>
        </motion.div>

        <motion.div className="card col-12 col-lg-5 my-3 p-0 rounded" style={bshad}
          initial={{right:"-100%"}}
          animate={{right:"0%"}}
          transition={{
             type: "spring",
             stiffness: 100,
             delay: 0.7,
             duration: 0.5,}
         }
          // exit={{right:"-100%"}}
        >
          <img src={greetGif.length!==0?greetGif.data[Math.floor(Math.random() * 50)].images.downsized.url:"logo512.png"} className="card-img-top img-fluid" style={imgFit} alt="..."/>
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">BCA 1<sup>st</sup> Semester</h5>
            <p className="card-text">Old BCA 1<sup>st</sup> Semester examination question paper. Click on download button to go to the download page.</p>
            <Link to="/downloads" state={{ grade: "BCA 1" }} className="btn btn-primary">Downloads</Link>
          </div>
        </motion.div>

      </div>
      <article>
        <p className="fw-light my-5 display-6 text-center">Check out our blog. We have articles from students about programming, algorithms, technology and more!</p> 
      </article>
    </main>
    <footer>
    <hr className="my-5"/>
      <p className="py-5 text-lead text-center">Created by @zeb_corp with <span className="text-danger">❤</span></p>
    </footer>
      <Outlet/>
    </div>



  );
}

export default Main;
