import React from 'react';
import { useLocation } from 'react-router-dom';
import './master.css';
import {useEffect, useState} from 'react';
import Files from './files';
import Axios from 'axios';

const Download=()=>{
  const location = useLocation();
  const { grade } =location.state==null?"all":location.state;
  const [allFiles, setAllFiles] = useState([])
  const [isLoading, setIsloading] = useState(false)
  useEffect(()=>{
    setIsloading(true);
    // fetch("http://svsdcardgen.42web.io")
    // .then((response)=>response.json())
    // .then(data => setAllFiles(data))
    Axios.post("https://zebra.42web.io/api.php")
    .then(response=>response)
    .then((data)=>{ setAllFiles(data.data);setIsloading(false);});
    // var xmlhttp = new XMLHttpRequest();
    //   xmlhttp.onload = function() {
    //     let datarr=JSON.parse(xmlhttp.responseText);
    //     setAllFiles(datarr);
    //   }
    // xmlhttp.open('POST',`https://zebra.42web.io/api.php`);
    // xmlhttp.send();
  },[])

    return(
      <>
      {isLoading&&<div className='position-absolute top-50 start-50 translate-middle'
        style={{backgroundColor:"rgba(0,0,0,0.5)",height:"100%",width:"100%",zIndex:'98'}}>
          <img src='dogcur.gif' className='spinner display-1 position-absolute top-50 start-50 translate-middle'/>
        </div>}
      <div className="container mt-5">
        {!location.state&&allFiles.map(ini=>
          <Files
          fname={ini.filename}
          batch={ini.batch}
          key={ini.id}
          />
        )}
        {location.state&&allFiles.map(ini=>
          grade===ini.batch&&
          <Files
          fname={ini.filename}
          batch={ini.batch}
          key={ini.id}
          />
        )}
      </div>
      </>
    );
  }

export default Download;
