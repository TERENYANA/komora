
import styles from "@/assets/css/user/termsandconditionspage.module.css"
export default function TermsAndConditionsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>1. Introduction</h2>
        <p className={styles.text}>
          Welcome to Komora Shop. These Terms and Conditions govern your use of our website and services. By accessing or using the site, you agree to be bound by these terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>2. Use of the Site</h2>
        <p className={styles.text}>
          You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>3. Intellectual Property</h2>
        <p className={styles.text}>
          All content on this site, including text, graphics, logos, and images, is the property of Komora Shop and is protected by intellectual property laws.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>4. User Accounts</h2>
        <p className={styles.text}>
          When you create an account, you must provide accurate information. You are responsible for maintaining the confidentiality of your account and password.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>5. Termination</h2>
        <p className={styles.text}>
          We reserve the right to terminate or suspend access to our site immediately, without prior notice or liability, for any reason whatsoever.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>6. Changes to Terms</h2>
        <p className={styles.text}>
          We may update these Terms and Conditions from time to time. Your continued use of the site after any changes indicates your acceptance of the new terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>7. Contact Us</h2>
        <p className={styles.text}>
          If you have any questions about these Terms and Conditions, please contact us at support@komora-shop.com.
        </p>
      </section>
    </div>
  );
}
