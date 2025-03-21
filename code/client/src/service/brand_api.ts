class BrandAPI{
    private route = "brand";
    // récupération de tous les enregistrements$
    //import.meta.env permet d'acceder aux variable d'environement
   public selectAll = async () =>{

    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`);
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
}

export default BrandAPI;