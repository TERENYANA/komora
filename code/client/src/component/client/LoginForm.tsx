import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type User from "@/model/User";
import Notice from "../common/Notice";
import SecurityAPI from "@/service/security_api";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";
import styles from "/app/src/assets/css/user/loginform.module.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors } 
  } = useForm<User>();

  const [message, setMessage] = useState<string>();
  const { user, setUser } = useContext(UserContext);

  const onSubmit = async (values: User) => {
    try {
      const request = await new SecurityAPI().login(values);
      
      if ([200, 201].includes(request.status)) {
        setUser(request.data);
        
        switch(request.data.role.name) {
          case "admin":
            navigate("/admin");
            break;
          case "user":
            navigate("/register");
            break;
          default:
            navigate("/");
        }
      } else {
        setError('email', { 
          type: 'manual', 
          message: 'Invalid email or password' 
        });
        setError('password', { 
          type: 'manual', 
          message: 'Invalid email or password' 
        });
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred during login");
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <h2 className={styles.title}>Welcome Back</h2>

        {message && (
          <div className={styles.errorMessage}>
            {message}
          </div>
        )}

        <Notice />
        
        <form 
          className={styles.form} 
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formGroup}>
            <label 
              htmlFor="email" 
              className={styles.label}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${styles.emailInput} ${errors.email ? styles.inputError : ''}`}
              placeholder="your@email.com"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && (
              <p className={styles.errorText}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label 
              htmlFor="password" 
              className={styles.label}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
              placeholder="••••••••"
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <p className={styles.errorText}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className={styles.captchaGroup}>
            <img 
              src="/src/assets/img/captcha.png" 
              alt="Captcha" 
              className={styles.captchaImage}
            />
            <input
              type="text"
              placeholder="Enter Captcha"
              maxLength={6}
              pattern="[A-Z0-9]{6}"
              className={styles.captchaInput}
              required
              aria-label="Captcha"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Login
            </button>
          </div>
        </form>
        
        <div className={styles.registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
