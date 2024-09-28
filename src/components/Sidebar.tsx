// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

type Project = {
  id: string;
  name: string;
};

type SidebarProps = {
  projects: Project[];
};

const Sidebar: React.FC<SidebarProps> = ({ projects }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#1f2d3d",
          color: "#ffffff",
        },
      }}
    >
      <Box sx={{ overflow: "auto", padding: 2 }}>
        {/* Раздел Мои команды */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{ backgroundColor: "transparent", color: "#ffffff" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
          >
            <Typography variant="subtitle1">Мои команды</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button component={Link} to="#">
                <ListItemText primary="Команда 1" />
              </ListItem>
              <ListItem button component={Link} to="#">
                <ListItemText primary="Команда 2" />
              </ListItem>
              <ListItem button component={Link} to="#">
                <ListItemText primary="Команда 3" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ backgroundColor: "#ffffff33", my: 1 }} />

        {/* Раздел Мои проекты */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{ backgroundColor: "transparent", color: "#ffffff" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
          >
            <Typography variant="subtitle1">Мои проекты</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/project/${project.id}`}
                    key={project.id}
                  >
                    <ListItemText primary={project.name} />
                  </ListItem>
                ))
              ) : (
                <Typography color="error">Нет проектов</Typography>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Поддержка */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://via.placeholder.com/25x25"
          alt="Support"
          style={{ marginRight: "10px" }}
        />
        <Typography>Поддержка</Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
