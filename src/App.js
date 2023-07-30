import Main from "./components/Main";
import { Route, Routes, redirect } from "react-router-dom";
import TheHome from "./components/TheHome";
import { useEffect, useState } from "react";

function App() {
  let getUser = (data) => {
    console.log(data);
  };
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TheHome getUser={getUser} />} />

        <Route path="/browse" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
