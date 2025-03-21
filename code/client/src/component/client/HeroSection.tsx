import styles from "/app/src/assets/css/user/herosection.module.css"
const HeroSection = () => {
    // état pour stocker les résultats de la requete HTTP
    return (
      <>
        <section className={styles.header__intro}>
          <div className={styles.header__intro__content}>
            <h1 className={styles.header__intro__title}>Welcome to <br /> Komora Shop</h1>
            <p className={styles.header__intro__text}>We are based in Ireland and will soon expand across Europe! <br />
              Here, you'll find a vast selection of products from Eastern countries—bringing you the flavors, traditions, and treasures that feel like home. Simply choose what you love, and we'll deliver it straight to your door.</p>
            <p className={styles.header__intro__sub__text}>Everything close to your heart, just a click away.</p>
          </div>
        </section>
      </>
    );
  };
  
  export default HeroSection;