import React from "react";
import styled from "styled-components";
import { FaSearch, FaCog, FaMoon } from "react-icons/fa";

const NavbarContainer = styled.div`
  height: 60px;
  background-color: #05386b; /* Темно-синий */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const SearchInput = styled.input`
  background-color: #edf5e1; /* Светло-серый */
  border: none;
  padding: 10px;
  color: #05386b;
  border-radius: 4px;
  width: 200px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <SearchInput placeholder="Поиск по проектам" />
      <IconContainer>
        <FaSearch />
        <FaMoon />
        <FaCog />
      </IconContainer>
    </NavbarContainer>
  );
};

export default Navbar;
