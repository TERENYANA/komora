import FaqAccordion from "./FaqAccordion";
import styles from "@/assets/css/user/faq.module.css"
const FaqPage = () => {
	return (
		<div className={styles.container}>
			<FaqAccordion/>
		</div>
	);
};
export default FaqPage;