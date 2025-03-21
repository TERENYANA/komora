import { useForm } from "react-hook-form";
import type User from "@/model/User";
import Notice from "../common/Notice";
import SecurityAPI from "@/service/security_api";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";


const LoginForm = () => {  // Wrapped in a component

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<User>();  // Added useForm

    const [message, setMessage] = useState<string>();
  
    //impoter le context
    const{user,setUser} =useContext(UserContext);

    const onSubmit = async (values: User) => {
       console.log(values)
       
        const request = await new SecurityAPI().login(values);
        console.log(values);
        if ([200, 201].indexOf(request.status) > -1) {
            setUser(request.data);
            if (request.data.role.name==="admin") {
                navigate("/admin");
            }
            else if(request.data.role.name==="user") {
                navigate("/register");
            }
            
        } else {
            setMessage("Registration failed");
            navigate("/");
        }
    };

    

    return (
        <>
            <h2>Login</h2>
            {message ? <p>{message}</p>: null}  {}
            <Notice/>
            
            <form
                className="space-y-4 p-4 max-w-lg mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
               
                
               <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input  // Changed textarea to input for lastname
                        id="email"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        {...register('email', {
                            required: "Email is required"
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input 
                        id="password"
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                
                
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default LoginForm;