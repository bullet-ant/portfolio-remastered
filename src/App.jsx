import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import { projectsData } from "./data/projects";

// Theme for styled-components
const theme = {
  colors: {
    background: "#f8f8f8",
    text: "#111111",
    primary: "#3498db",
    secondary: "#f39c12",
    accent: "#e74c3c",
    lightGray: "#e0e0e0",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header />
        <Hero />
        <main>
          <section id="work">
            {projectsData.map((project, index) => {
              // Get previous and next project colors for smooth transitions
              const previousProjectColors =
                index > 0 ? projectsData[index - 1].colors : null;
              const nextProjectColors =
                index < projectsData.length - 1
                  ? projectsData[index + 1].colors
                  : null;

              return (
                <ProjectSection
                  key={project.id}
                  project={project}
                  isEven={index % 2 === 0}
                  previousProjectColors={previousProjectColors}
                  nextProjectColors={nextProjectColors}
                />
              );
            })}
          </section>
          <AboutSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
