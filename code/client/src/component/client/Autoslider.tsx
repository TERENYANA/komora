import { useEffect, useState, useCallback } from "react";
import { longList } from "../../../data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "../../assets/css/user/autoslider.module.css";

const Autoslider = () => {
  const [images] = useState(longList);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImage((oldImage) => {
      return (oldImage === 0) ? images.length - 1 : oldImage - 1;
    });
    
    // Allow time for transition to complete
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning, images.length]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImage((oldImage) => {
      return (oldImage + 1) % images.length;
    });
    
    // Allow time for transition to complete
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning, images.length]);

  // Auto-play functionality
  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => {
      clearInterval(sliderId);
    };
  }, [nextSlide]);

  return (
    <>
      <section className={styles.sliderContainer}>
        <div className={styles.slidesWrapper}>
          {images.map((slideImage, slideImageIndex) => {
            const { id, name, image } = slideImage;
            
            // Calculate position class
            let position = '';
            if (slideImageIndex === currentImage) position = styles.activeSlide;
            else if (
              slideImageIndex === (currentImage - 1 + images.length) % images.length ||
              (currentImage === 0 && slideImageIndex === images.length - 1)
            ) position = styles.prevSlide;
            else position = styles.nextSlide;
            
            return (
              <article 
                className={`${styles.slide} ${position}`} 
                key={id}
              >
                <img src={image} alt={name} className={styles.slideImage} />
                {/* <h4 className={styles.slideName}>{name}</h4> */}
              </article>
            );
          })}
        </div>
        
        <div className={styles.dotsContainer}>
          {images.map((slide) => (
            <button type="button"
              key={slide.id}
              className={`${styles.dot} ${currentImage === images.indexOf(slide) ? styles.activeDot : ''}`}
              onClick={() => {
                setCurrentImage(images.indexOf(slide));
              }}
            />
          ))}
        </div>

        <button type="button" className={styles.prev} onClick={prevSlide} aria-label="Previous slide">
          <FiChevronLeft />
        </button>
        <button type="button" className={styles.next} onClick={nextSlide} aria-label="Next slide">
          <FiChevronRight />
        </button>
      </section>
    </>
  );
};

export default Autoslider;

