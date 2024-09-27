import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  margin-left: 250px;
  padding: 80px 20px;
  background-color: #edf5e1; /* Светлый серо-зеленый */
  color: #05386b;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #05386b; /* Темно-синий */
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProjectItem = styled.div`
  background-color: #5cdb95; /* Светло-зеленый */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const MainContent = () => {
  return (
    <MainContainer>
      <Title>Мои проекты</Title>
      <ProjectList>
        <ProjectItem>Проект 1</ProjectItem>
        <ProjectItem>Проект 2</ProjectItem>
        <ProjectItem>Проект 3</ProjectItem>
        <ProjectItem>Проект 4</ProjectItem>
      </ProjectList>
    </MainContainer>
  );
};

export default MainContent;
