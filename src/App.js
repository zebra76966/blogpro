import logo from './logo.svg';
import './App.css';
import AnimRoutes from './components/animated';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>

          <AnimRoutes/>
        
      </BrowserRouter>
    </>
  );
}

export default App;
