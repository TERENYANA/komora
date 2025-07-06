class ProductAPI{
    private route ='product';
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
public selectOne = async (id:number) =>{

    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/${id}`);
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
public selectByCategory = async (id: number) =>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/category/${id}`);
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
}; 
public insert = async (data:FormData,token:string) =>{
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{method:"POST",headers:{'Authorization':`Bearer ${token}`},body:data});
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
public update = async (data:FormData,token:string) =>{
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{method:"PUT",headers:{'Authorization':`Bearer ${token}`},body:data});
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};
public delete = async (data:FormData,token:string) =>{
    
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{method:"DELETE",headers:{'Authorization':`Bearer ${token}`},body:data});
    //récupérer la réponse 
    // exécuter la requête et récupérer la réponse JSON
    const response = await fetch(request);
    // const response = await request.json();
    //envoyuer les résultats
    return response.json();
};

}

export default ProductAPI;