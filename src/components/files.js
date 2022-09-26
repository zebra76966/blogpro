import React from 'react';
import "./master.css";
const imgFit={
  height:"50px",
  width:"50px",
  borderRadius:"100%",
  objectFit:"cover"
}
const Files=(fileDat)=>{
  return(
    <div className="row my-4">
      <div className="d-flex justify-content-between">
        <p className="fw-light m-0"><span className="d-md-inline d-none">Uploaded </span> By: {fileDat.uname}
        <i className="fa-solid fa-star anim px-2"></i></p>
        <figcaption className="blockquote-footer m-0 text-end">
          <cite title="Source Title">{fileDat.date}</cite>
        </figcaption>
      </div>
      <div className="boxShadow d-flex justify-content-between py-2 px-0 align-items-center align-middle rounded-pill row" key={fileDat.id}>
        <div className="col-md-2 col-1 d-flex justify-content-between">
          <img src="logo192.png" className="" style={imgFit}/><div className="vr"></div>
        </div>
        <div className="col-2 d-md-flex d-none justify-content-between align-items-center" style={{height:"50px"}}>
          <p className="my-0 text-truncate lead fs-6 fw-light">{fileDat.batch}</p><div className="vr"></div>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center" style={{height:"50px"}}>
          <p className="my-0 lead fs-6 fw-light text-truncate">{fileDat.fname}</p><div className="vr"></div>
        </div>
        <div className="col-md-2 col-4 d-flex align-items-center justify-content-end" style={{height:"50px"}}>
          <span className="my-0 lead fs-6 fw-bold px-2">Download</span><a href={"https://zebra.42web.io/downloadApi.php?file="+encodeURIComponent(fileDat.fname)} className="btn bg-dark btn-lg text-light rounded-circle"><i className="fa-solid fa-file-pdf"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Files;
