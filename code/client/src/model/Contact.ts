type Contact = {
    _id?: string; // Optionnel car pas présent lors de la création
    email: string;
    name: string;
    subject: string; 
    message: string; 
    contest: boolean;
};

export default Contact;