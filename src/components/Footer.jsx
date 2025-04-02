import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const FooterContainer = styled.footer`
  background-color: var(--text);
  color: var(--background);
  padding: 5rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
`;

const FooterText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactEmail = styled.a`
  font-size: 1.25rem;
  color: var(--primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--background);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary);
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FooterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--background);
  font-size: 1rem;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: 2px solid var(--primary);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--background);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: 2px solid var(--primary);
  }
`;

const FormButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--primary);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormFeedback = styled(motion.div)`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  background-color: ${(props) =>
    props.$isError ? "rgba(220, 53, 69, 0.2)" : "rgba(40, 167, 69, 0.2)"};
  color: ${(props) => (props.$isError ? "#dc3545" : "#28a745")};
  border: 1px solid
    ${(props) =>
      props.$isError ? "rgba(220, 53, 69, 0.5)" : "rgba(40, 167, 69, 0.5)"};
`;

const FormField = styled.div`
  position: relative;
`;

const FormError = styled.div`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 2rem 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    text-align: center;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--background);
  }
`;

function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    isError: false,
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFeedback({ show: false, isError: false, message: "" });

    try {
      const response = await fetch("https://formspree.io/f/xqapdynk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success message
        setFeedback({
          show: true,
          isError: false,
          message: "Message sent successfully! I'll get back to you soon.",
        });

        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedback({
        show: true,
        isError: true,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FooterContainer id="contact">
      <FooterContent>
        <FooterLeft>
          <FooterHeading>Let's work together</FooterHeading>
          <FooterText>
            I'm always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </FooterText>
          <ContactInfo>
            <ContactEmail href="mailto:hello@example.com">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              amancodes@hotmail.com
            </ContactEmail>
          </ContactInfo>
          <SocialLinks>
            <SocialLink
              href="https://linkedin.com/in/amankumar21"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 9H2V21H6V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://github.com/bullet-ant"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterLeft>

        <FooterRight>
          <FooterForm onSubmit={handleSubmit}>
            <FormField>
              <FormInput
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <FormError>{errors.name}</FormError>}
            </FormField>

            <FormField>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <FormError>{errors.email}</FormError>}
            </FormField>

            <FormField>
              <FormTextarea
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <FormError>{errors.message}</FormError>}
            </FormField>

            <FormButton
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </FormButton>

            <AnimatePresence>
              {feedback.show && (
                <FormFeedback
                  $isError={feedback.isError}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {feedback.message}
                </FormFeedback>
              )}
            </AnimatePresence>
          </FooterForm>
        </FooterRight>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          Copyleft &copy; {new Date().getFullYear()} Aman Kumar.
          <br />
          This website is{" "}
          <a
            href="https://github.com/bullet-ant/portfolio-remastered"
            style={{ color: "inherit", textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            100% open-source
          </a>
          .
        </Copyright>
        <FooterNav>
          <FooterLink href="#work">Work</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#about">About</FooterLink>
        </FooterNav>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
