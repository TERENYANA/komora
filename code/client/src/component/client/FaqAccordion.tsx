// FaqAccordion.tsx
import React, { useState } from 'react';
import styles from '@/assets/css/user/FaqAccordion.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isHighlighted?: boolean;
}

const FaqAccordion: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: "Can I return a product if I'm not satisfied?",
      answer: "Yes, you can return your product within 30 days of purchase. The product must be in its original condition and accompanied by the invoice. Return shipping costs are your responsibility except in the case of defective products."
    },
    {
      id: 2,
      question: "Where can I find recipe ideas using your products to cook at home?",
      answer: "We offer numerous recipes on our Instagram in the 'Recipes' section. You can also follow our Instagram page where we regularly share creative culinary ideas using our products.",
      isHighlighted: true
    },
    {
      id: 3,
      question: "Can I return a product if I'm not satisfied?",
      answer: "Yes, our return policy allows you to send back any product within 30 days of purchase for a full refund or exchange."
    },
    {
      id: 4,
      question: "Do you accept bulk orders for restaurants or specialty grocery stores?",
      answer: "Yes, we offer special rates for bulk orders intended for professionals. Please contact our sales department at sales@example.com for a personalized quote."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className={styles.accordionContainer}>
      <h2 className={styles.title}>Common questions</h2>
      <div className={styles.accordion}>
        {faqItems.map((item) => (
          <div 
            key={item.id} 
            className={`${styles.accordionItem} ${openItemId === item.id ? styles.active : ''} ${item.isHighlighted ? styles.highlighted : ''}`}
          >
            <div 
              className={styles.accordionHeader} 
              onClick={() => toggleItem(item.id)}
            >
              <h3 className={styles.accordionQuestion}>{item.question}</h3>
              <span className={styles.accordionIcon}>
                {openItemId === item.id ? '−' : '+'}
              </span>
            </div>
            {openItemId === item.id && (
              <div className={styles.accordionContent}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;