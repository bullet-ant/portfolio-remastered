import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillsData } from "../data/skills";

const Section = styled.section`
  position: relative;
  padding: 10rem 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.$backgroundColor || "var(--background)"} 0%,
    ${(props) => `${props.$accentColor}22` || "var(--background)"} 50%,
    #ffffff 100%
  );
  color: ${(props) => props.$textColor || "var(--text)"};
  overflow: hidden;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    ${(props) => `${props.$accentColor}40`} 0%,
    ${(props) => `${props.$accentColor}05`} 70%
  );
  border-radius: 50%;
  z-index: 0;
  opacity: 0.8;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin: 2rem auto 0;
  max-width: 700px;
  opacity: 0.8;
  line-height: 1.8;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: ${(props) =>
    props.$cardBackground || "rgba(255, 255, 255, 0.05)"};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      90deg,
      ${(props) => props.$accentColor || "var(--primary)"},
      ${(props) =>
        props.$accentColor ? `${props.$accentColor}DD` : "var(--secondary)"}
    );
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const CategoryIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${(props) => `${props.$accentColor}44` || "rgba(52, 152, 219, 0.3)"},
    ${(props) => `${props.$accentColor}88` || "rgba(52, 152, 219, 0.5)"}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${(props) => props.$accentColor || "var(--primary)"};
  box-shadow: 0 8px 20px
    ${(props) => `${props.$accentColor}33` || "rgba(52, 152, 219, 0.2)"};

  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.$accentColor || "var(--primary)"};
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.$accentColor || "var(--primary)"};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const SkillLevel = styled(motion.span)`
  opacity: 0;
`;

const ProgressBarContainer = styled.div`
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${(props) => props.$accentColor || "var(--primary)"},
    ${(props) => `${props.$accentColor}CC` || "var(--primary-light)"}
  );
  border-radius: 6px;
  box-shadow: 0 2px 8px
    ${(props) => `${props.$accentColor}55` || "rgba(0, 0, 0, 0.2)"};
`;

const Highlight = styled.span`
  color: var(--primary);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 0.3rem;
    background-color: var(--primary);
    opacity: 0.3;
    border-radius: 4px;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  ${(props) => props.$position};
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background: radial-gradient(
    circle at 30% 30%,
    ${(props) => `${props.$color}70` || "rgba(255,255,255,0.5)"},
    ${(props) => `${props.$color}10` || "rgba(255,255,255,0.1)"}
  );
  z-index: 0;
  opacity: 0.7;
  border-radius: 50%;
  backdrop-filter: blur(8px);
`;

function SkillsSection({ backgroundColor, textColor, accentColor }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Frontend":
        return (
          <path d="M20.59 12l-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.42-1.4l3.3-3.3zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L3.4 12zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48l-4 16z" />
        );
      case "Backend":
        return (
          <path d="M3 1.99a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-12zm2 0v12h14v-12H5zm2 4a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H7zm0 4a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2H7zm10-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM5 21.99a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
        );
      case "Database":
        return (
          <path d="M12 1C6.477 1 2 2.791 2 5s4.477 4 10 4 10-1.791 10-4-4.477-4-10-4zm0 6c-4.418 0-8-.935-8-2s3.582-2 8-2 8 .935 8 2-3.582 2-8 2zm-8 3c0 1.068 3.582 2 8 2s8-.932 8-2V8.823C18.39 9.598 15.421 10 12 10c-3.42 0-6.39-.402-8.177-1.177V10zm8 8c-4.418 0-8-.935-8-2v-4.822C5.61 12.402 8.579 13 12 13c3.42 0 6.39-.598 8.177-1.422V16c0 1.065-3.582 2-8 2zm8-6.177V18c0 1.065-3.582 2-8 2s-8-.935-8-2v-4.177C5.61 15.402 8.579 16 12 16c3.42 0 6.39-.598 8.177-1.422z" />
        );
      case "DevOps":
        return (
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.09-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
        );
      case "Testing":
        return (
          <path d="M21.71 20.29l-5.01-5.01A7.95 7.95 0 0 0 18 11c0-4.41-3.59-8-8-8S2 6.59 2 11s3.59 8 8 8c1.87 0 3.58-.65 4.95-1.73l5.01 5.01c.39.39 1.02.39 1.41 0l.34-.34a.996.996 0 0 0 0-1.41v.01zM10 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
        );
      case "Tools":
        return (
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        );
      default:
        return (
          <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8zm-2 13v-2h4v2h-4zm0-4v-2h4v2h-4zm0-4V7h4v2h-4z" />
        );
    }
  };

  return (
    <Section
      id="skills"
      ref={ref}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $accentColor={accentColor}
    >
      <BackgroundDecoration $accentColor={accentColor} />

      <FloatingElement
        $position="top: 18%; right: 15%;"
        $size={180}
        $color={accentColor}
      />
      <FloatingElement
        $position="top: 6%; left: 6%;"
        $size={220}
        $color={accentColor}
      />

      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            $accentColor={accentColor}
          >
            Technical <Highlight>Skills</Highlight>
          </SectionTitle>

          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            With a focus on scalability and performance, I've developed
            proficiency in various technologies across the full stack
            development and DevOps spectrum.
          </SectionSubtitle>
        </SectionHeader>

        <SkillsGrid>
          {Object.entries(skillsData).map(
            ([category, { icon, skills }], categoryIndex) => (
              <SkillCategory
                key={category}
                variants={containerAnimation}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ translateY: -5 }}
                $cardBackground={
                  backgroundColor === "var(--background)"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.05)"
                }
                $accentColor={accentColor}
              >
                <CategoryHeader>
                  <CategoryIcon $accentColor={accentColor}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      {getCategoryIcon(category)}
                    </svg>
                  </CategoryIcon>
                  <CategoryTitle $accentColor={accentColor}>
                    {category}
                  </CategoryTitle>
                </CategoryHeader>

                <SkillsList>
                  {skills.map((skill) => (
                    <SkillItem key={skill.name} variants={itemAnimation}>
                      <SkillName>
                        <span>{skill.name}</span>
                        <SkillLevel
                          initial={{ opacity: 0 }}
                          animate={
                            inView
                              ? {
                                  opacity: 1,
                                  transition: { delay: 1.5 },
                                }
                              : { opacity: 0 }
                          }
                        >
                          {skill.level}%
                        </SkillLevel>
                      </SkillName>
                      <ProgressBarContainer>
                        <ProgressBar
                          initial={{ width: 0 }}
                          animate={
                            inView ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{ duration: 1.2, delay: 0.3 }}
                          $accentColor={accentColor}
                        />
                      </ProgressBarContainer>
                    </SkillItem>
                  ))}
                </SkillsList>
              </SkillCategory>
            )
          )}
        </SkillsGrid>
      </Container>
    </Section>
  );
}

export default SkillsSection;
