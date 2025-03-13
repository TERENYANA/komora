import KomoraShop from "../component/home/KomoraShop";
import DatePicker  from "../component/common/DatePicker";
const HomePage = () => {
	//Fragment:balisee anonyme <></>
	return (
		<div className="container">
			<h1>Komora Shop</h1>
			<KomoraShop />
			<DatePicker></DatePicker>
		</div>
	);
};
export default HomePage;
