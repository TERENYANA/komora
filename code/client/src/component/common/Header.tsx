import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "/app/src/assets/css/header.module.css";
import CategoryAPI from "@/service/category_api";

type Category = {
  id: number;
  name: string;
};

interface HeaderProps {
  logo?: string;
  onCategorySelect?: (category: Category) => void;
}

const Header: React.FC<HeaderProps> = ({onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    new CategoryAPI().selectAll().then(response => setCategories(response.data));
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
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
    
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    
    navigate(`/catalog/${category.id}`);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };


  const handleAllProductsClick = () => {
    setActiveCategory(null);
    navigate('/catalog');
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
            <img width="35" height="35" src="/public/img/shooping-icon-komora.svg" alt="Shopping cart" />
          </Link>
          
          <Link to="/login" className={styles.accountIcon}>
            <img width="35" height="35" src="/public/img/account-icon-komora.svg" alt="Account" />
          </Link>
          
          <button type="button"
            className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.burgerLine}/>
            <span className={styles.burgerLine}/>
            <span className={styles.burgerLine}/>
          </button>
        </div>
      </div>
      
      {/* Underline animation */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <nav>
          <ul className={styles.categoryList}>
            <li>
              <button 
                type="button"
                onClick={handleAllProductsClick}
                className={`${styles.categoryButton} ${activeCategory === null ? styles.active : ''}`}
              >
                All Products
                <span className={styles.underline}/>
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button 
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                >
                  {category.name}
                  <span className={styles.underline}/>
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