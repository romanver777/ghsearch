import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../header/header";
import Main from "../main/main";
import PageIndex from "../page-index/page-index";
import PageSearch from "../page-search/page-search";

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/search/:name" element={<PageSearch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
