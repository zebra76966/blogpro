import logo from './logo.svg';
import './App.css';
import Header from './components/header.js';
import Main from './components/main.js';
import Download from './components/downloads.js';
import Contribute from './components/contribute.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<Main/>}/>
            <Route path="/downloads" element={<Download/>}/>
            <Route path="/contribute" element={<Contribute/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
