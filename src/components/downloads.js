import React from 'react';
import { useLocation } from 'react-router-dom';
import './master.css';
import {useEffect, useState, useRef} from 'react';
import Files from './files';
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Download=()=>{
  document.title="ExamWiz-Downloads"

  const oneload=useRef(true);
  const location = useLocation();
  const { grade } =location.state==null?"all":location.state;
  const [allFiles, setAllFiles] = useState([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(()=>{
    setIsloading(true);
    Axios.post("https://zebra.42web.io/api.php")
    .then(response=>response)
    .then((data)=>{ setAllFiles(data.data);setIsloading(false);
      if(oneload.current){
        oneload.current=false;toast.success("Loaded Successfully");
      }
    })
    .catch(error => {
      toast.error("This didn't work.")
      setIsloading(false);
    });
  },[])

    return(
      <>
      <Toaster />
      {isLoading&&<div className='position-absolute top-50 start-50 translate-middle'
        style={{backgroundColor:"rgba(0,0,0,0.5)",height:"100%",width:"100%",zIndex:'98'}}>
          <img src='dogcur.gif' className='spinner display-1 position-absolute top-50 start-50 translate-middle'/>
        </div>}
      <div className="container mt-5 px-4">

        {!location.state&&allFiles.map(ini=>
          <Files
          fname={ini.filename}
          batch={ini.batch}
          key={ini.id}
          date={ini.Udate}
          uname={ini.name}
          />
        )}

        {location.state&&allFiles.map(ini=>
          grade===ini.batch&&
          <Files
          fname={ini.filename}
          batch={ini.batch}
          key={ini.id}
          date={ini.Udate}
          uname={ini.name}
          />
        )}
      </div>
      </>
    );
  }

export default Download;
