import { useForm } from "react-hook-form";
import type User from "@/model/User";
import { useNavigate } from "react-router-dom";
import SecurityAPI from "@/service/security_api";
import { useState } from "react";
import styles from "/app/src/assets/css/user/registerform.module.css"; 

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();

  const onSubmit = async (values: User) => {
    try {
      const request = await new SecurityAPI().register(values);
      if ([200, 201].includes(request.status)) {
        window.sessionStorage.setItem("notice", "Account created");
        navigate("/login");
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      setMessage("Error - please try again");
      console.error("Registration error, account already exists", error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerWrapper}>
        <h2 className={styles.title}>Register</h2>
        {message && <div className={styles.errorMessage}>{message}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="firstname" className={styles.label}>Firstname</label>
            <input
              id="firstname"
              type="text"
              className={`${styles.input} ${errors.firstname ? styles.inputError : ''}`}
              {...register('firstname', {
                required: "Firstname is required",
                minLength: {
                  value: 2,
                  message: "Firstname must be at least 2 characters"
                }
              })}
            />
            {errors.firstname && <p className={styles.errorText}>{errors.firstname.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastname" className={styles.label}>Lastname</label>
            <input
              id="lastname"
              type="text"
              className={`${styles.input} ${errors.lastname ? styles.inputError : ''}`}
              {...register('lastname', {
                required: "Lastname is required"
              })}
            />
            {errors.lastname && <p className={styles.errorText}>{errors.lastname.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${styles.emailInput} ${errors.email ? styles.inputError : ''}`}
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="number" className={styles.label}>Number</label>
            <input
              id="number"
              type="tel"
              className={`${styles.input} ${errors.number ? styles.inputError : ''}`}
              {...register('number', {
                required: "Number is required",
                pattern: {
                  value: /^[0-9+\-() ]*$/,
                  message: "Invalid phone number"
                }
              })}
            />
            {errors.number && <p className={styles.errorText}>{errors.number.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Address</label>
            <input
              id="address"
              type="text" // Changed from "address" to "text" (HTML5 doesn’t have type="address")
              className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
              {...register('address', {
                required: "Address is required"
              })}
            />
            {errors.address && <p className={styles.errorText}>{errors.address.message}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;