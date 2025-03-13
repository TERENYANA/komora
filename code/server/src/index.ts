import Server from "./core/server.js";

console.log('DONE');

//démarer le server
const server: Server = new Server();

//process.env permet d'acceder aux variable d'environement
server.create().listen(process.env.PORT);