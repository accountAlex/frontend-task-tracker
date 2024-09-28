// ProfilePage.tsx
import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";

const ProfilePage: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 4,
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom color="textPrimary">
        Профиль пользователя
      </Typography>
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          backgroundColor: "#1f2d3d",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          Имя пользователя: Иван Иванов
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email: ivan@example.com
        </Typography>
        {/* Добавьте дополнительную информацию о профиле здесь */}
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary">
            Редактировать профиль
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
