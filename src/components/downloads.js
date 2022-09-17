import React from 'react';
import { useLocation } from 'react-router-dom';
import './master.css';
import {useEffect, useState} from 'react';
import Files from './files';

const Download=()=>{
  const location = useLocation();
  const { grade } =location.state==null?"all":location.state;
  const [allFiles, setAllFiles] = useState([])
  useEffect(()=>{
    console.log("useeffect ran")
    fetch("http://zebra.42web.io/api.php")
    .then((response)=>response.json())
    .then(data => setAllFiles(data))
  },[])

    return(
      <>
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
