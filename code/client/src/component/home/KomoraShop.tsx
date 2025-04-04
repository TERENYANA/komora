import { useEffect, useState } from "react";
import CategoryAPI from "../../service/category_api";
import type Category from "../../model/Category";
const KomoraShop = () => {
	// état pour stocker les résultats de la requete HTTP
	const [categories, setCategories] = useState<Category[]>([]);
	// l'état , modification d'éat
	// useEffect permet de déclencher des instructions à un moment de vie d'un composent :afficher,mis à jour un état ,déssafisher
	useEffect(() => {
		new CategoryAPI()
			.selectAll()
			.then((results) => setCategories(results.data));
	}, []);
	return (
		<>
			{categories.map((result) =>
				result.name === null ? (
					<p key={Math.random()}>{result.name}</p>
				) : (
					""
				),
			)}	
		</>
	);
};

export default KomoraShop;
