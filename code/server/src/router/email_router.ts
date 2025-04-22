import { Router, type Request, type Response } from "express";
import  nodemailer from "nodemailer"

class EmailRouter {
	private router: Router = Router();

	constructor() {
		this.router.post("/Gmail", this.sendGmail);
	}

	private sendGmail = async(req: Request, res: Response) => {
		const { to, subject, message } = req.body;

        try {
			// Transporteur SMTP
			const transporter = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.EMAIL_USER, // à mettre dans .env
					pass: process.env.EMAIL_PASSWORD, // à mettre dans .env
				},
			});
          
			const mailOptions = {
				from: `"Komora shop" <${process.env.EMAIL_USER}>`,
				to,
				subject,
				text: message,
			};
			await transporter.sendMail(mailOptions);

		res.status(200).json({
			success: true,
			message: "Email envoie avec succès ✅!",
		});
    } catch (error) {
        console.error(" ❌ Erreur lors de l'envoi d'email :", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'envoi d'email ❌",
        });
    }
	};
	

	public getRoutes = () => this.router;
}

export default EmailRouter;
