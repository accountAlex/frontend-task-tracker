import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaUser, FaBell, FaCog } from "react-icons/fa";

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  height: 100vh;
  width: ${({ isCollapsed }) => (isCollapsed ? "70px" : "250px")};
  background-color: #05386b; /* Темно-синий */
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  transition: width 0.4s ease;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #379683; /* Бирюзовый */
  }

  svg {
    margin-right: 10px;
  }
`;

const ToggleButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
`;

const SidebarLabel = styled.span<{ isCollapsed: boolean }>`
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
  transition: opacity 0.2s ease;
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
`;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <ToggleButton onClick={toggleSidebar}>
        <FaBars />
      </ToggleButton>
      <SidebarItem href="#">
        <FaUser />
        <SidebarLabel isCollapsed={isCollapsed}>Профиль</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="#">
        <FaBell />
        <SidebarLabel isCollapsed={isCollapsed}>Уведомления</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="#">
        <FaCog />
        <SidebarLabel isCollapsed={isCollapsed}>Настройки</SidebarLabel>
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
