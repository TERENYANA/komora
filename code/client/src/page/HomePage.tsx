import Notice from "@/component/common/Notice";
import HeroSection from "../component/client/HeroSection";
import styles from "/app/src/assets/css/user/home.module.css";
import Autoslider from "../component/client/Autoslider"
const HomePage = () => {
	//Fragment:balisee anonyme <></>
	return (
	<main>
			<div className={styles.homeBackground}>
				<Notice/>
			<HeroSection/>
			<Autoslider/>
		</div>
	</main>
	);
};
export default HomePage;
