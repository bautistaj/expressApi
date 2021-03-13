import { Router, Response, Request } from "express";
import { PostEntity } from "../database/entities/post.entity";
import { PostService } from "../services/post.service"; // import service

export class PostController {
  public router: Router;
  private postService: PostService; 

  constructor(){
    this.postService = new PostService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const posts = await this.postService.index();
    res.send(posts).json();
  } 

  public create = async (req: Request, res: Response) => {
    const post = req['body'] as PostEntity;
    const newPost = await this.postService.create(post);
    res.send(newPost);
  }

  public update = async (req: Request, res: Response) => {
    const post = req['body'] as PostEntity;
    const id =  req['params']['id'];
    
    res.send(this.postService.update(post, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.postService.delete(Number(id)));
  } 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}