// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/NavBar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import MainComponent from "./components/MainContent.tsx";
import ProfilePage from "./components/ProfilePage.tsx";
import ProjectBoard from "./components/ProjectBoard.tsx";
import Box from "@mui/material/Box";
import { Project } from "./types.ts";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4ADE7B",
    },
    secondary: {
      main: "#6C757D",
    },
    background: {
      default: "#121212",
      paper: "#1f2d3d",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Sidebar projects={projects} />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainComponent
                      projects={projects}
                      setProjects={setProjects}
                    />
                  }
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/project/:projectId"
                  element={
                    <ProjectBoard
                      projects={projects}
                      setProjects={function (
                        value: React.SetStateAction<Project[]>
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
