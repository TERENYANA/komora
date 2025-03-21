import type User from "@/model/User";
class SecurityAPI{
    // récupération de tous les enregistrements$
    //import.meta.env permet d'acceder aux variable d'environement
   public register = async (data:Partial<User>) =>{

    const request = new Request(`${import.meta.env.VITE_API_URL}/register`,
        {
            method:"POST",
            headers: {
                "Content-Type" : 'application/json',
            },
            body:JSON.stringify(data),
        }
    );
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};

public login = async (data:Partial<User>) =>{

    const request = new Request(`${import.meta.env.VITE_API_URL}/login`,
        {
            method:"POST",
            headers: {
                "Content-Type" : 'application/json',
            },
            body:JSON.stringify(data),
        }
    );
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
}

export default SecurityAPI;