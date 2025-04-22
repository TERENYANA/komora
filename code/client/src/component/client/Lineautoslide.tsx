import { type FC, memo, useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import styles from '../../assets/css/user/lineautoslide.module.css';
import img from '@/assets/img/komora-text95.svg';

interface MarqueeItemProps {
  id: string;
  imageUrl: string;
  altText: string;
}

const MarqueeItem: FC<MarqueeItemProps> = memo(({ imageUrl, altText }) => (
  <div className={styles.imageWrapper}>
    <img src={imageUrl} alt={altText} loading="lazy" />
  </div>
));

MarqueeItem.displayName = 'MarqueeItem';

interface MarqueeRowProps {
  direction: 'left' | 'right';
  speed?: number;
  items: MarqueeItemProps[];
}

const MarqueeRow: FC<MarqueeRowProps> = memo(({ direction, speed = 20, items }) => (
  <Marquee
    direction={direction}
    speed={speed}
    gradientColor="255,255,255"
    gradientWidth={50}
    className={styles.marqueeRow}
  >
    <div className={styles.imagesRow}>
      {items.map((item) => (
        <MarqueeItem
          key={`${direction}-${item.id}`}
          id={item.id}
          imageUrl={item.imageUrl}
          altText={item.altText}
        />
      ))}
    </div>
  </Marquee>
));

MarqueeRow.displayName = 'MarqueeRow';

/**
 * Lineautoslide Component
 * 
 * Displays a responsive, horizontal scrolling marquee with images
 * that automatically animate in opposite directions.
 */
const Lineautoslide: FC = () => {
  // Use useMemo to prevent recreating the array on each render
  const marqueeItems = useMemo(() => 
    Array(100).fill(null).map((_, index) => ({
      id: `item-${index}`,
      imageUrl: img,
      altText: 'free delivery'
    })),
    []
  );
  
  return (
    <section className={styles.marqueeContainer} aria-label="Scrolling announcements">
      <MarqueeRow
        direction="right"
        items={marqueeItems}
      />
      <MarqueeRow
        direction="left"
        items={marqueeItems}
      />
    </section>
  );
};

export default memo(Lineautoslide);