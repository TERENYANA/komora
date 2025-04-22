import styles from "@/assets/css/user/termsandconditionspage.module.css"
export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>1. Introduction</h2>
        <p className={styles.text}>
          Welcome to Komora Shop. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>2. Information We Collect</h2>
        <p className={styles.text}>
          We may collect personal information that you voluntarily provide to us when you register, express interest in our products, or otherwise contact us. This information may include your name, email address, postal address, phone number, and payment information.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>3. How We Use Your Information</h2>
        <p className={styles.text}>
          We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you administrative information, and to respond to your comments or questions.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>4. Cookies and Tracking Technologies</h2>
        <p className={styles.text}>
          We may use cookies, web beacons, tracking pixels, and other tracking technologies to help customize the site and improve your experience. You can choose to disable cookies through your browser settings.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>5. Third-Party Disclosure</h2>
        <p className={styles.text}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as necessary to provide our services or as required by law.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>6. Data Security</h2>
        <p className={styles.text}>
          We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>7. Contact Us</h2>
        <p className={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at privacy@komora-shop.com.
        </p>
      </section>
    </div>
  );
}