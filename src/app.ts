import express, {Application} from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import routes from './routes';
import { HomeRoutes } from './routes/home';

class App {
    private app:Application;
    private port:number;
  /**
   *
   */
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }
  private configureMiddleware() {
    this.app.engine("handlebars", engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(express.static(path.join(__dirname, "/../dist/client")));
  }
  private configureRoutes() {
    this.app.use(`/api/home`, new HomeRoutes().getRouter());
    this.app.get('*', (req, res) => {
      res.render('index', { title: 'Modular Express App' });
    });
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;