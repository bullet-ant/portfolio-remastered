import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ImageCollage from "./ImageCollage";

const Section = styled.section`
  position: relative;
  padding: 6rem 0;
  background-color: ${(props) =>
    props.$backgroundColor ||
    (props.$isEven ? "var(--background)" : "#f0f0f0")};
  overflow: hidden;
  color: ${(props) => props.$textColor || "var(--text)"};
`;

const CurveTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
  }

  .shape-fill {
    fill: ${(props) =>
      props.$previousColor ||
      (props.$isEven ? "#f0f0f0" : "var(--background)")};
  }
`;

const CurveBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
    transform: ${(props) => (props.$isEven ? "rotate(180deg)" : "none")};
  }

  .shape-fill {
    fill: ${(props) =>
      props.$nextColor || (props.$isEven ? "var(--background)" : "#f0f0f0")};
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContainer = styled.div`
  order: ${(props) => (props.$isEven ? 1 : 2)};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    order: 1;
  }
`;

const ImagesContainer = styled.div`
  order: ${(props) => (props.$isEven ? 2 : 1)};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    order: 2;
  }
`;

const ProjectCategory = styled(motion.span)`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(props) => props.$accentColor || "var(--primary)"};
  display: block;
  margin-bottom: 0.5rem;
`;

const ProjectTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
  color: ${(props) => props.$textColor || "inherit"};
`;

const ProjectDescription = styled(motion.p)`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: ${(props) => props.$descriptionColor || "inherit"};
`;

const TechStack = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background-color: ${(props) =>
    `${props.$tagColor}22` || "rgba(0, 0, 0, 0.05)"};
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  color: ${(props) => props.$descriptionColor || "inherit"};
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${(props) => props.$descriptionColor || "var(--text)"};
  background-color: transparent;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid currentColor;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.$textColor || "var(--text)"};
    color: ${(props) => props.$backgroundColor || "var(--background)"};
  }
`;

function ProjectSection({
  project,
  isEven,
  nextProjectColors,
  previousProjectColors,
}) {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Color settings from project data or fallback to default
  const backgroundColor = project?.colors?.background;
  const textColor = project?.colors?.text;
  const descriptionColor = project?.colors?.description || textColor;
  const accentColor = project?.colors?.accent;
  const tagColor = project?.colors?.tag || project?.colors?.accent;
  const linkColor = project?.colors?.link || project?.colors?.description;

  // Get colors for the previous and next sections for the curves
  const previousColor =
    previousProjectColors?.background ||
    (isEven ? "var(--background)" : "#f0f0f0");
  const nextColor =
    nextProjectColors?.background ||
    (!isEven ? "var(--background)" : "#f0f0f0");

  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Section
      ref={sectionRef}
      $isEven={isEven}
      id={`project-${project.id}`}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $descriptionColor={descriptionColor}
      $tagColor={tagColor}
    >
      <CurveTop $isEven={isEven} $previousColor={previousColor}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={previousColor}
          ></path>
        </svg>
      </CurveTop>

      <ContentContainer>
        <TextContainer $isEven={isEven}>
          <motion.div
            variants={animation}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ProjectCategory variants={animation} $accentColor={accentColor}>
              {project.category}
            </ProjectCategory>
            <ProjectTitle variants={animation} $textColor={textColor}>
              {project.title}
            </ProjectTitle>
            <ProjectDescription
              variants={animation}
              $descriptionColor={descriptionColor}
            >
              {project.description}
            </ProjectDescription>

            <TechStack variants={animation}>
              {project.techStack.map((tech) => (
                <TechTag
                  key={tech}
                  $accentColor={accentColor}
                  $textColor={textColor}
                  $descriptionColor={descriptionColor}
                  $tagColor={tagColor}
                >
                  {tech}
                </TechTag>
              ))}
            </TechStack>

            <ProjectLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              $textColor={textColor}
              $backgroundColor={backgroundColor}
              $descriptionColor={descriptionColor}
            >
              View Project
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 2H14V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66669 9.33333L14 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ProjectLink>
          </motion.div>
        </TextContainer>

        <ImagesContainer $isEven={isEven}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? 50 : -50 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ImageCollage images={project.images} />
          </motion.div>
        </ImagesContainer>
      </ContentContainer>

      <CurveBottom $isEven={!isEven} $nextColor={nextColor}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={backgroundColor}
          ></path>
        </svg>
      </CurveBottom>
    </Section>
  );
}

export default ProjectSection;
