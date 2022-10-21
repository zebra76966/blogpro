import React from 'react'
import Content from './blog-content'
import './master.css'
import { useLocation,useParams } from "react-router-dom";
import Article from './readBlog'
const nez={
  position:'absolute',
  zIndex:'-1',
  top:"-2%",
  left:"40%",
  transform:"rotate(351deg)",
  width:"100%",
  maxWidth:"50px"
}


const Blog=()=>{
  const params=useParams();
  document.title="ExamWiz-Blog"
  return(
    <>
    {params.id=="default"&&
    <>
    <div className="hero"></div>
    <div className="hero2"></div>
      <div className="container" style={{marginTop:"-5%  !important"}}>
        <div className="row vh-100 d-flex align-items-center text-light">
          <div className="col-12 col-md-6">
            <h1 className="display-2 fw-bold">TECH BLOG</h1>
            <p className="lead">
              <em>Posts about tech problems, solution, codes, algorithms etc.</em>
              <span className="fw-bold d-block">Check them Out!</span>
            </p>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-end position-relative">
            <img src="../thero.png" className="img-fluid" style={{width:"100%",maxWidth:"350px"}}/>
            <img src="../nez.gif" className="img-fluid" style={nez}/>
            <img src="../gary.gif" className="img-fluid gar" />
            <img src="../goku.gif" className="img-fluid gok" />
          </div>
        </div>
      </div>
      <div className="bg-dark py-5 ">
        <div className="container">
          <div className="row justify-content-between">
            <Content/>
          </div>
        </div>
      </div>
      </>
    }
    {params.id=="horizontal-pixel-span"&&<Article/>}
    </>
  )
}

export default Blog;
