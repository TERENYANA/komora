import Notice from "@/component/common/Notice";
import HeroSection from "../component/client/HeroSection";
import styles from "../assets/css/user/home.module.css";
import Autoslider from "../component/client/Autoslider";
import Lineautoslide from "@/component/client/Lineautoslide";
import ValuePropositionCards from "@/component/client/ValuePropositionCards";
import FaqAccordion from "@/component/client/FaqAccordion";
import NewestArrivals from "./client/NewestArrivals";
const HomePage = () => {
	//Fragment:balisee anonyme <></>
	return (
		<main>
			<div className={styles.homeBackground}>
				<Notice />
				<HeroSection />
				<Autoslider />
				<NewestArrivals/>
				<Lineautoslide />
				<ValuePropositionCards />
				<FaqAccordion/>
			</div>
		</main>
	);
};
export default HomePage;
