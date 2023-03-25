import React from "react";
import Header from "./header.js";
import Main from "./main.js";
import Download from "./downloads.js";
import Contribute from "./contribute.js";
import Blog from "./blog.js";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const AnimRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/downloads" element={<Download />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/blog/:id/:title" element={<Blog />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
