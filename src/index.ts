import bodyParser from "body-parser";
import dotenv from "dotenv";
import log4js from "log4js";
import httpContext from "express-http-context";
import swaggerUi from "swagger-ui-express";
import express, { Express } from "express";
import { useExpressServer } from "routing-controllers";
import { CryptoController } from "./controller/crypto-controller";
import { GlobalErrorHandler } from "./middleware/global-error-handler";
import * as swaggerDocument from "./swagger/openapi.json";

dotenv.config();
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

//const
const app: Express = express();
const port = process.env.PORT || 4200;
const routes = [ CryptoController ]

app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
	controllers: routes,
	middlewares: [GlobalErrorHandler],
	defaultErrorHandler: false,
	cors: {
		origin: "*", // (note: do not use this in production)
	},
});

app.use((req, res, next) => {
	httpContext.ns.bindEmitter(req);
	httpContext.ns.bindEmitter(res);
	next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//create listen
app.listen(port, () => console.log(`Running on port ${port}`));
