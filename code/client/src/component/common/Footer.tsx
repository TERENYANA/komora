import type React from 'react';
import styles from '@/assets/css/footer.module.css';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <a href="/faq" className={styles.navLink}>FAQ</a>
            </li>
            <li className={styles.navItem}>
              <Link to="/contact" className={styles.navLink}>Customer Service</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/termsandconditions" className={styles.navLink}>Terms & Conditions</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/privacypolicy" className={styles.navLink}>Privacy Policy</Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.socialLinks}>
          <a href="https://tiktok.com" className={styles.socialLink} aria-label="TikTok">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
              <title>TikTok</title>
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.27 0 .54.05.78.13V9.4a6.13 6.13 0 00-1-.08A6.25 6.25 0 005 20.83a6.18 6.18 0 009.47-5.16v-6.9a8.16 8.16 0 004.69 1.46v-3.54c0-.02-.38 0-.57 0z" />
            </svg>
          </a>
          <a href="https://facebook.com" className={styles.socialLink} aria-label="Facebook">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
              <title>Facebook</title>
              <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
            </svg>
          </a>
          <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
              <title>Instagram</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
