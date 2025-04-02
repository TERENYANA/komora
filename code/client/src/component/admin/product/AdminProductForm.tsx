import { useForm } from "react-hook-form";
import type Product from "@/model/Product";
import ProductAPI from "@/service/product_api";
import { useContext, useEffect, useState } from "react";
import type Category from "@/model/Category";
import CategoryAPI from "@/service/category_api";
import { useNavigate, useParams } from "react-router-dom";
import BrandAPI from "@/service/brand_api";
import type Brand from "@/model/Brand";
import SecurityAPI from "@/service/security_api";
import { UserContext } from "@/component/provider/UserProvider";



const AdminProductForm = () => {
    // handleSubmit permet de gérer a soumission du formulaire
    //register permet de référencer les champs de formulaire
    const { 
        handleSubmit, 
        register, 
        formState: { errors } ,
        reset
    } = useForm<Product>();

    const [categories, setCategories] = useState<Category[]>();

    const [brands, setBrands] = useState<Brand[]>();
    
    const navigate = useNavigate();

    //récupérer l'identifient de l'URL
    const { id } = useParams();
    console.log(id);

    //récupérer l'utilisateur
    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        //executer en chaine des promesses
        Promise.allSettled([
            new CategoryAPI().selectAll(),
            new BrandAPI().selectAll(),
            id ? new ProductAPI().selectOne(id as unknown as number) : null,
        ]).then((responses) => { 
            if (responses[0].status === "fulfilled") {
                setCategories(responses[0].value.data)
            }
            if (responses[1].status === "fulfilled") {
                setBrands(responses[1].value.data)
            }

            if (id && responses[2].status === "fulfilled") {
                //metter à jour les donées du formulaire
                reset(responses[2].value.data)
            }
        });
    }, [id,reset]);
    

    /*
    Deux types de formulaire
    -sans fishier
    -la propriété de body de la roquete HTTP peut être en json :JSON.stringify
    -dans la roquêtte HTTP,utiliser l'en tête HTTP : Content-Type:application/json 
    -avec fichier
    -la propriété body de la roquette HTTP doit être en FormData
    -la balise <form> doit posséder l'atribut entype = "multipart/form-data"
    */
    
    // soumission du formulaire
    const onSubmitProduct = async (values: Product) => {
        //créer un FormData en rarenant strictement le nom des champs
        const formData = new FormData();
        formData.append('id', values.id.toString());
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('imageURL', values.imageURL[0]);
        formData.append('weight', values.weight.toString());
        formData.append('stock', values.stock.toString());
        formData.append('category_id', values.category_id.toString());
        formData.append('brand_id', values.brand_id.toString());

        console.log(values);
        
        // Here you would typically send the data to your backend
        // try {
        //     const response = await fetch('/api/products', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error('Error:', error);
        // }


        //récupérer un token d'autorisation
        const auth = await new SecurityAPI().auth(user);
        // console.log(auth.data.token)



        const request = id
            ? await new ProductAPI().update(formData,auth.data.token)
            : await new ProductAPI().insert(formData,auth.data.token);

        console.log(request);
        

        if ([200, 201].indexOf(request.status) > -1) {
            navigate("/admin/product");
            //redirection

        }
    };

    return (
        <form
            className="space-y-4 p-4 max-w-lg mx-auto"
            onSubmit={handleSubmit(onSubmitProduct)}
            encType="multipart/form-data"
        >
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <input 
                    id="name"
                    type="text" 
                    className="w-full border rounded px-3 py-2"
                    {...register('name', {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                        }
                    })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <textarea 
                    id="description"
                    className="w-full border rounded px-3 py-2"
                    {...register('description', {
                        required: "Description is required"
                    })}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            
            <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">Price:</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <input 
                    id="price"
                    type="number" 
                    step="0.01"
                    className="w-full border rounded px-3 py-2"
                    {...register('price', {
                        required: "Price is required",
                        min: {
                            value: 0.01,
                            message: "Price must be greater than 0"
                        }
                    })}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            
            <div>
                <label htmlFor="imageURL" className="block text-sm font-medium mb-1">Image:</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <input 
                    id="imageURL"
                    type="file" 
                    className="w-full border rounded px-3 py-2"
                    accept="image/*"
                    {...register('imageURL',id?{}: {
                        required: "Image is required"
                    })}
                />
                {errors.imageURL && <p className="text-red-500 text-sm mt-1">{errors.imageURL.message}</p>}
            </div>
            
            <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1">Weight (kg):</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <input 
                    id="weight"
                    type="number" 
                    step="0.001"
                    className="w-full border rounded px-3 py-2"
                    {...register('weight', {
                        required: "Weight is required",
                        min: {
                            value: 0.001,
                            message: "Weight must be greater than 0"
                        }
                    })}
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
            </div>
            
            <div>
                <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock:</label>
                {/* Reprendre STRICTEMENT le nom des colonnes SQL  */}
                <input 
                    id="stock"
                    type="number" 
                    className="w-full border rounded px-3 py-2"
                    {...register('stock', {
                        required: "Stock is required",
                        min: {
                            value: 0,
                            message: "Stock cannot be negative"
                        }
                    })}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
            </div>
            
            <div>
            <label htmlFor="category_id" className="block text-sm font-medium mb-1">Category:</label>
            <select id="category_id" {...register("category_id", { required: true })}>
            {categories?.map((category: Category) => (
            <option key={category.id} value={category.id}>
            {category.name}
            </option>
             ))}
            </select>
                
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
            </div>
            

            <div>
            <label htmlFor="brand_id" className="block text-sm font-medium mb-1">Brand:</label>
            <select id="brand_id" {...register("brand_id", { required: true })}>
            {brands?.map((brand: Brand) => (
            <option key={brand.id} value={brand.id}>
            {brand.name}
            </option>
             ))}
            </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
            </div>

            <input type="hidden"{...register('id')} value={id} />
            
            <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default AdminProductForm;