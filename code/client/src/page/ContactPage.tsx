import styles from "../assets/css/user/contact.module.css";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type Contact from "@/model/Contact";
import ContactAPI from "@/service/contact_api";

const ContactPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<Contact>();

  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Function to send form data
  const onSubmitContact = async (values: Contact) => {
    setIsSubmitting(true);
    try {
      // Insert data using API
      const res = await new ContactAPI().insert(values);
      
      if ([200, 201].includes(res.status)) {
        setMessage("Message received. We will contact you soon.");
        
        // Email sending
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/email/Gmail`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              to: values.email,
              subject: "Message Confirmation",
              message: `Hello ${values.name},\n\n Your Message has been received. We will reply to you as soon as possible. \n\nThank You!!!`
            }),
          });
        } catch (emailError) {
          console.error("Error sending confirmation email", emailError);
          // Continue with form success even if email fails
        }

        // Reset form
        reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage("Failed to send message. Please try again.");
        console.error("Failed to send message", res);
      }
    } catch (error) {
      setMessage("Error receiving message. Please try again later.");
      console.error("Error while receiving message", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        {message && <div className={message.includes("Failed") || message.includes("Error") ? styles.errorMessage : styles.successMessage}>{message}</div>}
        <div className={styles.mainContent}>
          {/* Form Container */}
          <div className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmitContact)}
            >
              <div className={styles.formGroup}>
                <label htmlFor="sujet">Subject of your inquiry</label>
                <select
                  className={styles.select}
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                >
                  <option value="" disabled>
                    Select your option
                  </option>
                  <option value="produit">
                    Product Information
                  </option>
                  <option value="commande">Order Tracking</option>
                  <option value="reclamations">Complaints</option>
                  <option value="collaboration">
                    Commercial Collaboration and Digital Marketing
                  </option>
                  <option value="presse">Press Relations</option>
                  <option value="autre">Other</option>
                </select>
                {errors.subject && (
                  <span className={styles.error}>{errors.subject.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  className={styles.input}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={styles.input}
                  placeholder="Your email"
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  {...register("message", {
                    required: "Please enter your message",
                  })}
                  className={styles.textarea}
                  placeholder="Your message"
                />
                {errors.message && (
                  <span className={styles.error}>
                    {errors.message.message}
                  </span>
                )}
              </div>
              <div className={styles.formGroupCheckbox}>
                <input
                  type="checkbox"
                  {...register("contest", { 
                    required: "You must accept the terms" 
                  })}
                  className={styles.checkbox}
                />
                <label htmlFor="contest">
                  I authorize the use of my personal data to respond to my request
                </label>
                {errors.contest && (
                  <span className={styles.error}>{errors.contest.message}</span>
                )}
              </div>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
          {/* Information Container */}
          <div className={styles.infoContainer}>
            <h2 className={styles.infoTitle}>Information</h2>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>42 O'Connell Street,<br /> Dublin 1, Ireland</span>
            </div>
            <div className={styles.infoItem}>
              <FaClock className={styles.icon} />
              <span>
                <h4>Opening Hours:</h4>
                <br />
                Monday - Friday: 9:00 AM - 7:00 PM
                <br /><br />
                Saturday: 10:00 AM - 5:00 PM
                <br /><br />
                Sunday: Closed
              </span>
            </div>
            <div className={styles.infoItem}>
              <FaPhone className={styles.icon} />
              <span>+353 1 234 5678</span>
            </div>
            <div className={styles.infoItem}>
              <FaWhatsapp className={styles.icon} />
              <span>+353 87 123 4567</span>
            </div>
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.icon} />
              <span>contact@yourbusiness.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;


