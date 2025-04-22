// ValuePropositionCards.tsx
import  { useEffect, useRef } from 'react';
import styles from '@/assets/css/user/Valuepropositioncards.module.css';

export default function ValuePropositionCards() {
  // Properly type the ref array
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Data for cards
  const cards = [
    {
      id: 'card-curated',
      icon: '🛒',
      title: 'Carefully Curated',
      subtitle: 'Products',
      description: 'Hand-selected items that meet our quality standards',
      bgColor: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
      id: 'card-service',
      icon: '🕒',
      title: '24/7',
      subtitle: 'Service & Delivery',
      description: 'Support and delivery available whenever you need it',
      bgColor: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      id: 'card-customers',
      icon: '✅',
      title: '100%',
      subtitle: 'Satisfied Customers',
      description: 'Our commitment to your complete satisfaction',
      bgColor: 'linear-gradient(135deg, #10b981, #3b82f6)'
    }
  ];

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {cards.map((card, index) => (
          <div
            ref={(el) => (cardsRef.current[index] = el)}
            key={card.id}
            className={styles.card}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div 
              className={styles.iconContainer}
              style={{ background: card.bgColor }}
            >
              <span className={styles.icon}>{card.icon}</span>
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{card.title}</h2>
              <h3 className={styles.subtitle}>{card.subtitle}</h3>
              <p className={styles.description}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}