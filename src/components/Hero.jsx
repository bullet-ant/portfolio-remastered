import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroHeading = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1.1;
  margin-bottom: 2rem;
  max-width: 900px;
`;

const HeroSubheading = styled(motion.p)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  max-width: 600px;
  margin-bottom: 1rem;
  color: #555;
`;

const Highlight = styled.span`
  color: var(--primary);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.3rem;
    background-color: var(--primary);
    opacity: 0.3;
    border-radius: 4px;
  }
`;

const ScrollCtaWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  display: flex;
  justify-content: center;
`;

const ScrollCtaContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
    white-space: nowrap;
  }
`;

const ScrollIcon = styled(motion.div)`
  width: 1.5rem;
  height: 2.5rem;
  border: 2px solid var(--text);
  border-radius: 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--text);
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

function Hero() {
  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroSubheading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, my name is
        </HeroSubheading>
        <HeroHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Highlight>Aman</Highlight> Kumar
        </HeroHeading>
        <HeroSubheading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I build scalable, high-performance applications and streamline
          deployments with containerization and orchestration.
        </HeroSubheading>
      </HeroContent>

      <ScrollCtaWrapper>
        <ScrollCtaContent
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p>Scroll to explore</p>
          <ScrollIcon
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          />
        </ScrollCtaContent>
      </ScrollCtaWrapper>
    </HeroContainer>
  );
}

export default Hero;
