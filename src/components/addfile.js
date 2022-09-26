import React from 'react';
import {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddFiles=(props)=>{
const [tresponse, setTresponse]= useState('');
const [response, setResponse] =useState('');
const [cookies, setCookie, removeCookie] = useCookies(['uToken']);
const [isLoading, setIsloading] = useState(false)
const [udata, setUdata]=useState({
  course:"",
  batch:"",

})

const handlesubmit=(e)=>{
  e.preventDefault();
  setIsloading(true);

  const FD = new FormData(document.getElementById('uform'));
  let formData = new FormData();    //formdata object
  if(udata.course.length==""||udata.batch.length==""){
    setTresponse('Feilds are Unchanged');
      setIsloading(false);
    return;
  }
  else if(e.target.FileUp.files[0].type!=="application/pdf"){
    setTresponse('Only PDF file format is supported');
      setIsloading(false);
    return;
  }
  FD.append('batchName',udata.batch);
  FD.append('CourseName',udata.course);
  FD.append('userFile',e.target.FileUp.files[0]);    //append the values with key, value pair
  console.log([...FD.entries()]);
  // FD.append('age', 20);

  const config = {
      headers: { 'content-type': 'multipart/form-data' }
  }

  Axios.post("https://zebra.42web.io/apiPhp/myFiles/uploadFile.php?token="+cookies.uToken, FD, config)
      .then(response => {
          console.log(response);
          setResponse(response.data.statusText);
          setCookie('uToken', response.data.rtoken.token, { path: '/' });
          props.udata(response.data.userData);
          setUdata({course:"",batch:""});
          e.target.FileUp.value="";
          setIsloading(false);
          toast.success(response.data.statusText);
        })
      .catch(error => {
          console.log(error);
          setResponse(error.message);
          setIsloading(false);
      });

}

  return(
    <div className="d-flex h-100 align-items-center justify-content-center">
      <Toaster />
    {isLoading&&<div className='position-absolute top-50 start-50 translate-middle'
      style={{backgroundColor:"rgba(0,0,0,0.5)",height:"100%",width:"100%",zIndex:'98'}}>
        <img src='dogcur.gif' className='spinner display-1 position-absolute top-50 start-50 translate-middle'/>
      </div>}

      <form id="uform" onSubmit={handlesubmit} className="row g-3 col-11 col-md-5 p-4 my-5 text-light rounded" style={{background:"#36393f"}}>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">Add Files</h3>
        <button type="button" onClick={()=>toast((t) => (
          <span>
            <b>Log Out?  </b>
            <a className="btn bg-info text-light  mx-2" onClick={() =>{removeCookie('uToken');toast.dismiss(t.id)}}>
              <i className="fa-solid fa-check"></i>
            </a>
            <a className="btn bg-dark text-light" onClick={() => toast.dismiss(t.id)}>
              <i className="fa-solid fa-xmark"></i>
            </a>
          </span>
        ))} className="btn bg-dark text-light text-center fs-5 rounded"><i className="fa-solid fa-right-from-bracket p-2"></i></button>
      </div>
        {tresponse.length!==0&&<p className="fw-bold text-info">{tresponse}</p>}
      <hr/>
        <div className="col-12 col-md-6">
          <label for="Course" className="form-label">Course</label>
          <select className="form-select bg-dark text-light border-0 p-3 form-select" id="Course" name="Course"
            value={udata.course}
            onChange={(e)=>setUdata({...udata,course:e.target.value})}
            required
          >
            <option selected value="BCA 1">Select Course</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label for="Batch" className="form-label">Batch</label>
          <select className="form-select bg-dark text-light border-0 p-3 form-select" id="Course" name="Course"
          value={udata.batch}
          onChange={(e)=>setUdata({...udata,batch:e.target.value})}
          required
          >
          <option selected value="select">Select Batch</option>
          <option value="BCA 1">BCA 1</option>
          <option value="BCA 2">BCA 2</option>
          <option value="BCA 3">BCA 3</option>
          <option value="BCA 4">BCA 4</option>
          <option value="BCA 5">BCA 5</option>
          <option value="BCA 6">BCA 6</option>
          </select>
        </div>
        <div className="col-12">
          <label for="FileUp" className="form-label">Add Files (*PDF only)</label>
          <input type="file" className="form-control bg-dark text-light border-0" id="FileUp" name="FileUp"
            required
          />

        </div>

        <div className="col-12 py-2">
          <button type="submit" className="btn w-100 fw-bold py-2 btn-lg btn-primary">Continue</button>
        </div>
      </form>

    </div>
  );
}

export default AddFiles;
