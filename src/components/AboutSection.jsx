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

const BackgroundDecoration = styled.div`
  position: absolute;
  bottom: -200px;
  left: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(52, 152, 219, 0.1) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
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

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

  &::before {
    content: "";
    position: absolute;
    top: -2%;
    left: -2%;
    width: 104%;
    height: 104%;
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    opacity: 0.15;
    z-index: -1;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation: morphing 15s ease-in-out infinite;
  }

  @keyframes morphing {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(52, 152, 219, 0.3);
    border-radius: 1rem;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 1rem;
    transition: transform 0.5s ease;
    object-fit: cover;
    aspect-ratio: 3/4;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 70%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border-radius: 1rem;
`;

const AboutText = styled.div`
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    order: -1;
  }
`;

const SectionHeading = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
`;

const AboutSubheading = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary);
  margin: 2rem 0 1.5rem;
`;

const AboutDescription = styled(motion.div)`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const AboutStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text);
  opacity: 0.8;
`;

const CtaButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  font-weight: 600;
  border-radius: 0.25rem;
  text-decoration: none;
  margin-top: 1.5rem;
  box-shadow: 0 4px 14px rgba(52, 152, 219, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
  }
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

  return (
    <AboutContainer id="about" ref={ref}>
      <BackgroundDecoration />

      <AboutContent>
        <AboutImage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 1, scale: 0.8 } : { opacity: 0, scale: 0.6 }
          }
          transition={{ duration: 0.7 }}
          whileHover={{
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img src="profile.jpeg" alt="Profile portrait" />
          <ImageOverlay />
        </AboutImage>

        <AboutText>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <SectionHeading variants={item}>
              About <Highlight>Me</Highlight>
            </SectionHeading>

            <AboutSubheading variants={item}>
              Full Stack Developer & DevOps Engineer
            </AboutSubheading>

            <AboutDescription variants={item}>
              <p>
                First and foremost, I love programming! Ever since I discovered
                the immense power of technology, I've been channeling that
                passion into creating meaningful solutions. As a passionate
                full-stack developer, I specialize in building scalable web
                applications that solve real-world problems. I'm constantly
                exploring emerging technologies to expand my toolkit and push
                the boundaries of what's possible!
              </p>
            </AboutDescription>

            <AboutStats variants={item}>
              <StatItem>
                <StatNumber>4+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>8+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>4+</StatNumber>
                <StatLabel>Tech Stack</StatLabel>
              </StatItem>
            </AboutStats>

            <CtaButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CtaButton>
          </motion.div>
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutSection;
