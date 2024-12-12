import { useEffect, useState } from "react";
import KomoraShopAPI from "../../service/komora_shop_api";
import type Role from "../../model/role";

const KomoraShop = () => {
	// état pour stocker les résultats de la requete HTTP
	const [categories, setCategories] = useState<Role[]>([]);

	// l'état , modification d'éat
	// useEffect permet de déclencher des instructions à un moment de vie d'un composent :afficher,mis à jour un état ,déssafisher
	useEffect(() => {
		new KomoraShopAPI()
			.selectAll()
			.then((results) => setCategories(results.data));
	}, []);

	return (
		<>
			{categories.map((result) => (
				<p>{result.name}</p>
			))}
		</>
	);
};

export default KomoraShop;
