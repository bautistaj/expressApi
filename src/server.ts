import express, {Request, Response} from 'express';
import { PostController } from './controller/post.controller'; // import the post controller
import { createConnection } from "typeorm";

class Server {
  private postController: PostController;
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "blog",
      password: "blog",
      database: "blog",
      entities: ["build/database/entities/**/*.js"],
      synchronize: true,
      name: "blog"
    });

    this.postController = new PostController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Hello world!" );
    });

    this.app.use(`/api/posts/`,this.postController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
