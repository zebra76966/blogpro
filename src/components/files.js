import React from 'react';
const imgFit={
  height:"50px",
  width:"50px",
  borderRadius:"100%",
  objectFit:"cover"
}
const Files=(fileDat)=>{
  return(

      <div className="boxShadow d-flex justify-content-between my-3 p-2 align-items-center align-middle rounded-pill row" key={fileDat.id}>
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
          <span className="my-0 lead fs-6 fw-bold px-2">Download</span><a href={"http://zebra.42web.io/downloadApi.php?file="+fileDat.fname} className="btn bg-dark btn-lg text-light rounded-circle"><i className="fs-md-1 fs-3 fa-solid fa-file-pdf"></i></a>
        </div>
      </div>
  );
}

export default Files;
