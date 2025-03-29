import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CollageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  margin: 2rem 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 450px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 400px;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 65%;
  height: auto;
  transform-origin: center;
  aspect-ratio: 4/3;

  &:nth-child(1) {
    top: 0;
    left: 0;
    z-index: 3;
    transform: rotate(-5deg);
  }

  &:nth-child(2) {
    top: 15%;
    right: 0;
    z-index: 2;
    transform: rotate(3deg);
  }

  &:nth-child(3) {
    bottom: 0;
    left: 15%;
    z-index: 1;
    transform: rotate(7deg);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    &:nth-child(3) {
      display: none;
    }

    &:nth-child(1) {
      width: 70%;
    }

    &:nth-child(2) {
      width: 60%;
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

function ImageCollage({ images }) {
  // Only display up to 3 images
  const displayImages = images.slice(0, 3);

  // Define rotate values based on image index
  const getRotationValue = (index) => {
    return index === 0 ? -5 : index === 1 ? 3 : 7;
  };

  return (
    <CollageContainer>
      {displayImages.map((image, index) => (
        <ImageWrapper
          key={index}
          initial={{
            opacity: 0,
            scale: 0.9,
            rotate: getRotationValue(index),
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: getRotationValue(index),
          }}
          whileHover={{
            rotate: 0,
            scale: 1.1,
            transition: {
              rotate: { duration: 0.2, damping: 100 },
              scale: { duration: 0.15 },
            },
          }}
          // Adding custom transition for returning to original state
          transition={{
            duration: 0.2,
            delay: 0,
            // This makes the return animation faster
            type: "spring",
            stiffness: 200,
            damping: 20,
            // Different durations for entering and exiting hover state
            rotate: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.2, // Fast return to original rotation
            },
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.15, // Fast return to original scale
            },
          }}
          viewport={{ once: true }}
        >
          <ProjectImage
            src={image}
            alt={`Project image ${index + 1}`}
            loading="lazy"
          />
        </ImageWrapper>
      ))}
    </CollageContainer>
  );
}

export default ImageCollage;
