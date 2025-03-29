import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutContainer = styled.section`
  padding: 8rem 0;
  background-color: var(--background);
  position: relative;
  overflow: hidden;
`;

const AboutContent = styled.div`
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

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    opacity: 0.1;
    z-index: -1;
    border-radius: 50% 30% 60% 40% / 40% 50% 30% 60%;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 1rem;
  }
`;

const AboutText = styled.div`
  position: relative;
`;

const AboutHeading = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
`;

const AboutSubheading = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 1.5rem;
`;

const AboutDescription = styled(motion.div)`
  font-size: 1.125rem;
  margin-bottom: 2.5rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 2rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled(motion.span)`
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skills = [
    "UI/UX Design",
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "CSS/SCSS",
    "Figma",
    "Responsive Design",
    "Animation",
    "RESTful APIs",
    "Agile Methodology",
    "Git",
  ];

  return (
    <AboutContainer id="about" ref={ref}>
      <AboutContent>
        <AboutImage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.7 }}
        >
          <img src="profile.jpeg" alt="Profile portrait" />
        </AboutImage>

        <AboutText>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <AboutHeading variants={item}>About Me</AboutHeading>
            <AboutSubheading variants={item}>
              Full Stack Developer with 4+ Years of Experience
            </AboutSubheading>

            <AboutDescription variants={item}>
              <p>
                With a background spanning Full-stack development and
                specialized DevOps expertise within security-focused teams, I
                excel in strengthening digital infrastructures and optimizing
                development workflows. Skilled in tailoring user interfaces,
                implementing containerization strategies, and automating
                processes, I am dedicated to driving continuous improvement and
                excellence across all endeavors.
              </p>
            </AboutDescription>

            {/* <SkillsContainer variants={item}>
              <SkillsTitle>Skills & Expertise</SkillsTitle>
              <SkillsList>
                {skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    variants={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </SkillsList>
            </SkillsContainer> */}
          </motion.div>
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutSection;
