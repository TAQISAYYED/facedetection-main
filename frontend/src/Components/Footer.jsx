import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h2>MyApp</h2>
          <p>Building modern web applications with speed and quality.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Github size={20} /></a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}

