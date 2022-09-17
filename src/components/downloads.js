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
  useEffect(()=>{
    // fetch("http://svsdcardgen.42web.io")
    // .then((response)=>response.json())
    // .then(data => setAllFiles(data))
    // Axios.get('https://zebra.42web.io')
    // .then(response=>response)
    // .then(data=> setAllFiles(data.data));
    var xmlhttp = new XMLHttpRequest();
      xmlhttp.onload = function() {
        let datarr=JSON.parse(xmlhttp.responseText);
        setAllFiles(datarr);
      }
    xmlhttp.open('POST',`https://zebra.42web.io/api.php`);
    xmlhttp.send();
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
