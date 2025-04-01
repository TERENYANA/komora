import type { Request, Response, NextFunction } from "express";
import  jwt, { type JwtPayload } from "jsonwebtoken";


class AutorizationMiddleware {
	//vérifier du oken et le rôle de l'utilisateur
	public check =
		(roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
			//récupérer le token contenu l'en-tete Authorization : Bearer<token>
			const token = req.headers.authorization?.split("Bearer ")[1];
			// console.log(token);
			//décoder le token
			let tokenDecoded:JwtPayload;
			try {
				tokenDecoded = jwt.verify(
					token as string,
					process.env.JWT_KEY as string
				)as JwtPayload;
				console.log(tokenDecoded);
			} catch (error) {
				res.status(401).json({
					status: 401,
				  message: process.env.NODE_ENV === "prod" ? 'Error' : "Invalid token"
				});
				 return
			}
			//vérifier le rôle de l'utilisateur
			if(roles.indexOf(tokenDecoded.user.role.name) === -1){
				res.status(401).json({
					status: 401,
				  message: process.env.NODE_ENV === "prod" ? 'Error' : "Role not allowed"
				});
				 return
			}
			//passer au middleware
			//bloquer la suite du script
			next();
		};
}
export default AutorizationMiddleware;
