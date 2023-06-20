import express, {Application} from "express";
import {Request, Response} from "express";
import helmet from "helmet";
import passport from "passport";
import cors from "cors";
import {connectDatabase} from "./utils/dbConnection";

import {
    AuthRoutes,
    //UserRoutes,
    //ProfileRoutes,
    //ModuleRoutes,
    //CategoryRoutes,
} from "./routes";

//import {local, jwt} from "./utils/strategies";
//import {OnlyAdmins, Auth} from "./app/Middlewares";
//import { FileEnum } from "./types/FileEnum";

const version = "0.0.1";

export class Server {
    public app: Application;

    public port: String;

    constructor(port: String) {
        this.app = express();
        this.port = port;

        this.registerMiddlewares();
        this.initializePassportAndStrategies();
        this.regsiterRoutes();

        connectDatabase();
        // this.start()
        console.log(port)
        console.log(`HTTP Application server ready to be started at ${this.port}`);
    }

    registerMiddlewares() {
        //this.app.use(express.static(`${process.cwd()}${FileEnum.PUBLICDIR}`));
        this.app.use(express.json({limit: "50mb"}));
        this.app.use(express.urlencoded({limit: "50mb", extended: true}));
        this.app.use(helmet());
        this.app.use(cors());
    }

    regsiterRoutes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json({message: `App running on version ${version}`});
        });
        this.app.use("/api/v1/auth", AuthRoutes);
        // this.app.use("/api/v1/profile", Auth, ProfileRoutes);
        // this.app.use("/api/v1/user", Auth, UserRoutes);
        // this.app.use("/api/v1/module", OnlyAdmins, ModuleRoutes);
        // this.app.use("/api/v1/category", Auth, CategoryRoutes);

    }

    initializePassportAndStrategies() {

        this.app.use(passport.initialize())
        // passport.use(local)
        // passport.use(jwt)
    }

    start() {
        const http = require("http").createServer(this.app);
        http.listen(this.port, () => {
            console.log(`:rocket: HTTP Server started at port ${this.port}`);
        });
    }
}
