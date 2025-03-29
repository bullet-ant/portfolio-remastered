import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;

  &.scrolled {
    background-color: rgba(248, 248, 248, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Logo = styled(motion.div)`
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderContainer
      className={isScrolled ? "scrolled" : ""}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <HeaderContent>
        <Logo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Portfolio
        </Logo>
        <Nav>
          <NavLink href="#work" whileHover={{ y: -2 }}>
            Work
          </NavLink>
          <NavLink href="#about" whileHover={{ y: -2 }}>
            About
          </NavLink>
          <NavLink href="#contact" whileHover={{ y: -2 }}>
            Contact
          </NavLink>
        </Nav>
        <MenuButton aria-label="Menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
