import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import styles from "/app/src/assets/css/header.module.css";


type Category = {
  id: number;
  name: string;
};

interface HeaderProps {
  logo?: string;
  onCategorySelect?: (category: Category) => void;
}

const Header: React.FC<HeaderProps> = ({ logo = 'Komora Shop', onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Fetch categories from your SQL database
    // This is a placeholder - replace with your actual API call
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Provide some fallback categories for testing
        setCategories([
          { id: 1, name: 'Clothing' },
          { id: 2, name: 'Accessories' },
          { id: 3, name: 'Home Decor' },
          { id: 4, name: 'Electronics' },
        ]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleCategoryClick = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
         <img src="/public/img/komora-logo-x-size [Recovered].svg" alt="Komora shop logo" />
        </Link>
        
        <div className={styles.rightSection}>
          <Link to="/cart" className={styles.cartIcon}>
           <img width="35" height="35" src="/public/img/shooping-icon-komora.svg" alt="" />
          </Link>
          
          <Link to={"/login"} className={styles.accountIcon}>
            <img width="35" height="35" src="/public/img/account-icon-komora.svg" alt="" />
          </Link>
          
          <button 
            className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <nav>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category.id}>
                <button 
                  onClick={() => handleCategoryClick(category)}
                  className={styles.categoryButton}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;