import {Request, Response, NextFunction, response} from 'express';
export default class HomeController {
    /**
     *
     */
    constructor() {
        
    }
    public welcome(req: Request,res: Response, next: NextFunction) {
        return res.send('Hello World')
    }
}