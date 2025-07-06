import type Contact from "@/model/Contact";
import styles from "../../assets/css/admin/sendemailpage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactAPI from "@/service/contact_api";
import axios from "axios";

const AdminSendEmailPage = () => {
  const { _id } = useParams<{ _id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      new ContactAPI()
        .selectOne(_id)
        .then((response) => setContact(response.data))
        .catch((error) => console.error("Error fetching contact:", error));
    }
  }, [_id]);

  if (!contact) return <div className={styles.container}>Chargement...</div>;

  const handleSendEmail = async () => {
    if (!contact.email || !contact.subject || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/email/Gmail`, {
        to: contact.email,
        subject: contact.subject,
        message: message,
      });
      alert("Email envoyé avec succès !");
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Échec de l'envoi de l'email.");
    }
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Répondre à : {contact.name}
      </div>

      <div className={styles.field}>
        <div className={styles.label}>À :</div>
        <div className={styles.input}>{contact.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>Subject:</div>
        <div className={styles.input}>{contact.subject}</div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">Message :</label>
        <textarea
          id="message"
          className={styles.textarea}
          value={message}
          placeholder="Écrivez votre réponse ici..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="button" className={styles.button} onClick={handleSendEmail}>
        Envoyer
      </button>
    </div>
  );
};

export default AdminSendEmailPage;

