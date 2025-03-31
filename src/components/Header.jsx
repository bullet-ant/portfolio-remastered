import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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

const Logo = styled(motion.a)`
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  color: var(--text);
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
  z-index: 110; // Ensure it's above the mobile menu

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(248, 248, 248, 0.95);
  backdrop-filter: blur(15px);
  z-index: 105;
  padding-top: 4.5rem;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 104;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  background-color: rgba(248, 248, 248, 0.95);
`;

const MobileNavLink = styled(motion.a)`
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
  width: 100%;
  transition: color 0.2s ease, background-color 0.2s ease;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

  &:hover {
    color: var(--primary);
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer
      className={isScrolled ? "scrolled" : ""}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <HeaderContent>
        <Logo
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Portfolio
        </Logo>
        <Nav>
          <NavLink href="#work" whileHover={{ y: -2 }}>
            Work
          </NavLink>
          <NavLink href="#skills" whileHover={{ y: -2 }}>
            Skills
          </NavLink>
          <NavLink href="#about" whileHover={{ y: -2 }}>
            About
          </NavLink>
          <NavLink href="#contact" whileHover={{ y: -2 }}>
            Contact
          </NavLink>
        </Nav>
        <MenuButton
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
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
          )}
        </MenuButton>
      </HeaderContent>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MobileNav>
                <MobileNavLink
                  href="#home"
                  onClick={handleNavLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="#work"
                  onClick={handleNavLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Work
                </MobileNavLink>
                <MobileNavLink
                  href="#skills"
                  onClick={handleNavLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Skills
                </MobileNavLink>
                <MobileNavLink
                  href="#about"
                  onClick={handleNavLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="#contact"
                  onClick={handleNavLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </MobileNavLink>
              </MobileNav>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}

export default Header;
