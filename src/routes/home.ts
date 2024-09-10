import { Router } from 'express';
import HomeController from '../controllers/HomeController';

export class HomeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    const controller = new HomeController();
    this.router.get('/', controller.welcome);
  }

  public getRouter(): Router {
    return this.router;
  }
}