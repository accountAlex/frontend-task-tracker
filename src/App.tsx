import React from "react";
import Sidebar from "./components/SideBar.tsx";
import Navbar from "./components/NavBar.tsx";
import MainContent from "./components/MainContent.tsx";

const App = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <MainContent />
    </>
  );
};

export default App;
