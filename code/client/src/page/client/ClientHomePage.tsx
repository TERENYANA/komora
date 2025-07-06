import styles from "@/assets/css/client/clienthome.module.css";

const ClientHomePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.welcomeMessage}>Welcome to your space</h1>
            <p className={styles.subMessage}>
                We are still working on all functionalities. Stay tuned for exciting updates!
            </p>
        </div>
    );
};

export default ClientHomePage;