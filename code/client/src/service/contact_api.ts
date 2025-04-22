import type Contact from "@/model/Contact";
class ContactAPI{
    public route = "contact"
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
public selectOne = async (_id:string) =>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/${_id}`);
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
public insert = async (data: Contact) => {
    try {
        const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        const response = await fetch(request);
        return response; // Retournez l'objet response complet
    } catch (error) {
        console.error("Error inserting contact:", error);
        throw error;
    }
};
}
export default ContactAPI;