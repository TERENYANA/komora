import { useForm } from "react-hook-form";
import type User from "@/model/User";
import { useNavigate } from "react-router-dom";
import SecurityAPI from "@/service/security_api";
import { useState } from "react";

const RegisterForm = () => {

    // Wrapped in a component

    const { register, handleSubmit, formState: { errors } } = useForm<User>(); 

    const navigate = useNavigate();
    
    const [message, setMessage] = useState<string>();
     // Added useForm


    const onSubmit = async (values: User) => {

        try {
            const request = await new SecurityAPI().register(values);
            if ([200, 201].indexOf(request.status) > -1) {
                window.sessionStorage.setItem("notice", "Account created");
                navigate("/login");
            } else {
                setMessage("Registration failed");
            }
        } catch (error) {
            setMessage("Error - please try again");
            console.error("Registration error,accaoun already exist", error);
        }
    };

    return (
        <>
            <h2>Register</h2>
            {message ? <p>{message}</p>: null}  {}
            
            <form
                className="space-y-4 p-4 max-w-lg mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium mb-1">Firstname</label>
                    <input 
                        id="firstname"
                        type="text" 
                        className="w-full border rounded px-3 py-2"
                        {...register('firstname', {
                            required: "Firstname is required",
                            minLength: {
                                value: 2,
                                message: "Firstname must be at least 2 characters"
                            }
                        })}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
                </div>
                
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium mb-1">Lastname</label>
                    <input  // Changed textarea to input for lastname
                        id="lastname"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        {...register('lastname', {
                            required: "Lastname is required"
                        })}
                    />
                    {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
                </div>
                
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
                
                <div>
                    <label htmlFor="number" className="block text-sm font-medium mb-1">Number</label>
                    <input 
                        id="number"
                        type="tel"
                        className="w-full border rounded px-3 py-2"
                        {...register('number', {
                            required: "Number is required",
                            pattern: {
                                value: /^[0-9+\-() ]*$/,
                                message: "Invalid phone number"
                            }
                        })}
                    />
                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
                </div>
                
                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                    <input 
                        id="address"
                        type="address"  
                        className="w-full border rounded px-3 py-2"
                        {...register('address', {
                            required: "Address is required"
                        })}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>} 
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

export default RegisterForm;