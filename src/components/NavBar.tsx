// Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Логика выхода из системы
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1f2d3d" }}>
      <Toolbar>
        {/* Логотип */}
        <Avatar
          src="https://via.placeholder.com/43x43"
          alt="Logo"
          sx={{ marginRight: 2 }}
        />
        {/* Название приложения */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            "&:hover": { color: "primary.main" },
          }}
        >
          TaskTracker
        </Typography>
        {/* Аватар пользователя */}
        <Box>
          <Tooltip title="Открыть меню">
            <IconButton onClick={handleMenuOpen} size="large" sx={{ p: 0 }}>
              <Avatar
                src="https://via.placeholder.com/40x40"
                alt="User Avatar"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: "45px",
                backgroundColor: "#1f2d3d",
                color: "#ffffff",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => navigate("/profile")}>Профиль</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              Выйти
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
