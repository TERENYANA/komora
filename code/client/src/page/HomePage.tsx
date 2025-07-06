import Notice from "@/component/common/Notice";
import HeroSection from "../component/client/HeroSection";
import styles from "../assets/css/user/home.module.css";
import Autoslider from "../component/client/Autoslider";
import Lineautoslide from "@/component/client/Lineautoslide";
import ValuePropositionCards from "@/component/client/ValuePropositionCards";
import FaqAccordion from "@/component/client/FaqAccordion";
import NewestArrivals from "./client/NewestArrivals";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Komora Shop | Quality Products Delivered</title>
        <meta 
          name="description" 
          content="Discover high-quality products at Komora Shop. Fast delivery, secure checkout, and an exceptional shopping experience." 
        />
        <meta 
          name="keywords" 
          content="Komora Shop, e-commerce, online shopping, buy products, fast delivery, quality service" 
        />
        <meta name="author" content="Komora Shop Team" />
        <link rel="canonical" href="https://komora-shop.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      
      <main>
        <div className={styles.homeBackground}>
          <Notice />
          <HeroSection />
          <Autoslider />
          <NewestArrivals />
          <Lineautoslide />
          <ValuePropositionCards />
          <FaqAccordion />
        </div>
      </main>
    </>
  );
};

export default HomePage;
